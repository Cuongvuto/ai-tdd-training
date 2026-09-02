from copy import deepcopy
import json
import unittest
from pathlib import Path

from login_issue_automation import process_login_ticket


FIXTURES_DIR = Path(__file__).resolve().parents[1] / "fixtures"


def load_fixture(name: str):
    with (FIXTURES_DIR / name).open(encoding="utf-8") as fixture_file:
        return json.load(fixture_file)


def find_by_id(records, record_id):
    return next(record for record in records if record["id"] == record_id)


def find_by_email(records, email):
    return next((record for record in records if record["email"] == email), None)


class LoginIssueAutomationTest(unittest.TestCase):
    def setUp(self):
        self.tickets = load_fixture("tickets.json")
        self.hr_employees = load_fixture("hr-employees.json")
        self.lms_accounts = load_fixture("lms-accounts.json")

    def process_fixture_ticket(self, ticket_id):
        ticket = deepcopy(find_by_id(self.tickets, ticket_id))
        email = ticket.get("requesterEmail")
        hr_employee = deepcopy(find_by_email(self.hr_employees, email)) if email else None
        lms_account = deepcopy(find_by_email(self.lms_accounts, email)) if email else None
        return ticket, lms_account, process_login_ticket(ticket, hr_employee, lms_account)

    def test_ignores_ticket_that_is_not_a_login_issue(self):
        _, _, result = self.process_fixture_ticket("W5-OTHER-001")

        self.assertEqual(result.status, "ignored")
        self.assertEqual(result.actions, ())

    def test_resets_password_for_active_lms_account_of_active_employee(self):
        _, lms_account, result = self.process_fixture_ticket("W5-LOGIN-001")

        self.assertEqual(result.status, "password_reset")
        self.assertEqual(result.actions, ("reset_password",))
        self.assertEqual(lms_account["accountStatus"], "Active")

    def test_reactivates_deactivated_active_employee_account_then_resets_password(self):
        _, lms_account, result = self.process_fixture_ticket("W5-LOGIN-002")

        self.assertEqual(result.status, "reactivated_and_reset")
        self.assertEqual(result.actions, ("reactivate_account", "reset_password"))
        self.assertEqual(lms_account["accountStatus"], "Active")

    def test_routes_terminated_employee_to_manual_review_without_lms_change(self):
        _, lms_account, result = self.process_fixture_ticket("W5-LOGIN-003")

        self.assertEqual(result.status, "needs_manual_review")
        self.assertIn("add_internal_note", result.actions)
        self.assertEqual(lms_account["accountStatus"], "Deactivated")

    def test_routes_missing_requester_email_to_manual_review(self):
        _, _, result = self.process_fixture_ticket("W5-LOGIN-004")

        self.assertEqual(result.status, "needs_manual_review")
        self.assertIsNotNone(result.internal_note)

    def test_escalates_system_wide_issue_without_lms_change(self):
        _, lms_account, result = self.process_fixture_ticket("W5-LOGIN-005")

        self.assertEqual(result.status, "failed_manual_review")
        self.assertEqual(lms_account["accountStatus"], "Deactivated")

    def test_routes_missing_hr_record_to_manual_review(self):
        _, _, result = self.process_fixture_ticket("W5-LOGIN-006")

        self.assertEqual(result.status, "needs_manual_review")

    def test_escalates_when_lms_account_is_missing(self):
        _, _, result = self.process_fixture_ticket("W5-LOGIN-007")

        self.assertEqual(result.status, "failed_manual_review")

    def test_escalates_when_simulated_lms_action_fails(self):
        ticket = deepcopy(find_by_id(self.tickets, "W5-LOGIN-001"))
        hr_employee = deepcopy(find_by_email(self.hr_employees, ticket["requesterEmail"]))
        lms_account = deepcopy(find_by_email(self.lms_accounts, ticket["requesterEmail"]))
        lms_account["simulateActionFailure"] = True

        result = process_login_ticket(ticket, hr_employee, lms_account)

        self.assertEqual(result.status, "failed_manual_review")
        self.assertIn("escalate_manual_review", result.actions)

    def test_returns_audit_log_without_password_data(self):
        _, _, result = self.process_fixture_ticket("W5-LOGIN-001")

        self.assertIn("ticket=W5-LOGIN-001", result.audit_log)
        self.assertNotIn("password=", result.audit_log.casefold())


if __name__ == "__main__":
    unittest.main()
