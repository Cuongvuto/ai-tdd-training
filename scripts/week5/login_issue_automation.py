"""Local/mock automation for Week 5 Scenario 1 — Login Issue."""

from dataclasses import dataclass
import logging
from typing import Any, Mapping, MutableMapping


logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class AutomationResult:
    """A local audit record; it does not send email or call external systems."""

    status: str
    actions: tuple[str, ...]
    internal_note: str | None
    user_response: str | None
    audit_log: str


def process_login_ticket(
    ticket: Mapping[str, Any],
    hr_employee: Mapping[str, Any] | None,
    lms_account: MutableMapping[str, Any] | None,
) -> AutomationResult:
    """Process one ticket using local HR and LMS fixtures.

    `systemWideIssue` and `simulateActionFailure` are local/mock test controls,
    not fields claimed for the real ticket or LMS APIs.
    """
    ticket_id = str(ticket.get("id", "unknown-ticket"))
    ticket_text = f"{ticket.get('subject', '')} {ticket.get('description', '')}".casefold()
    requester_email = ticket.get("requesterEmail")

    if not _is_login_issue(ticket_text):
        return _result(ticket_id, "ignored")

    if not requester_email:
        return _manual_review(
            ticket_id,
            "needs_manual_review",
            "Thiếu email người yêu cầu; không thể đối chiếu HR và LMS.",
        )

    if ticket.get("systemWideIssue") is True:
        return _manual_review(
            ticket_id,
            "failed_manual_review",
            "Có dấu hiệu lỗi hệ thống diện rộng; đã chuyển escalation.",
        )

    if hr_employee is None or hr_employee.get("email") != requester_email:
        return _manual_review(
            ticket_id,
            "needs_manual_review",
            "Không tìm thấy bản ghi HR khớp với email ticket.",
        )

    if hr_employee.get("employmentStatus") == "terminated":
        return _manual_review(
            ticket_id,
            "needs_manual_review",
            "HR xác nhận nhân sự đã nghỉ việc; không thay đổi tài khoản LMS.",
        )

    if hr_employee.get("employmentStatus") != "active":
        return _manual_review(
            ticket_id,
            "needs_manual_review",
            "Trạng thái HR không đủ điều kiện để xử lý tự động.",
        )

    if lms_account is None or lms_account.get("email") != requester_email:
        return _manual_review(
            ticket_id,
            "failed_manual_review",
            "Không tìm thấy tài khoản LMS khớp với email ticket.",
        )

    if lms_account.get("simulateActionFailure") is True:
        return _manual_review(
            ticket_id,
            "failed_manual_review",
            "Thao tác LMS mô phỏng bị lỗi; đã chuyển manual review.",
        )

    account_status = lms_account.get("accountStatus")
    if account_status == "Active":
        return _result(
            ticket_id,
            "password_reset",
            actions=("reset_password",),
            user_response="Tài khoản LMS đã được đặt lại mật khẩu. Vui lòng thử đăng nhập lại.",
        )

    if account_status == "Deactivated":
        lms_account["accountStatus"] = "Active"
        return _result(
            ticket_id,
            "reactivated_and_reset",
            actions=("reactivate_account", "reset_password"),
            user_response="Tài khoản LMS đã được kích hoạt lại và đặt lại mật khẩu. Vui lòng thử đăng nhập lại.",
        )

    return _manual_review(
        ticket_id,
        "failed_manual_review",
        "Trạng thái tài khoản LMS không được nhận diện; đã chuyển manual review.",
    )


def _is_login_issue(ticket_text: str) -> bool:
    return "đăng nhập" in ticket_text or "login" in ticket_text


def _manual_review(ticket_id: str, status: str, note: str) -> AutomationResult:
    return _result(
        ticket_id,
        status,
        actions=("add_internal_note", "escalate_manual_review"),
        internal_note=note,
        user_response="Yêu cầu đang được chuyển cho bộ phận hỗ trợ để kiểm tra thêm.",
    )


def _result(
    ticket_id: str,
    status: str,
    *,
    actions: tuple[str, ...] = (),
    internal_note: str | None = None,
    user_response: str | None = None,
) -> AutomationResult:
    audit_log = f"ticket={ticket_id}; status={status}; actions={','.join(actions) or 'none'}"
    logger.info(audit_log)
    return AutomationResult(status, actions, internal_note, user_response, audit_log)
