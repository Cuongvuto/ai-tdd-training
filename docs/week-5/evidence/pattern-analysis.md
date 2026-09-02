# Phân tích Pattern Ticket — Week 5

## Phạm vi và phương pháp

- **Nguồn:** 131 ticket Week 5; đối chiếu với
  [reporting-analysis.md](reporting-analysis.md).
- Mỗi Ticket ID được xếp vào một `Primary issue group` theo `Subject`; Tags chỉ
  hỗ trợ đối chiếu vì 64/131 ticket ban đầu không có tag.
- Bằng chứng đếm: PivotTable `Tickets by Primary Issue Group` trong Excel.

## 5 vấn đề lặp lại hàng đầu

| Hạng | Nhóm vấn đề | Số ticket | Tỷ lệ | Bằng chứng tiêu biểu | Giả thuyết cần xác minh | Khuyến nghị |
| ---: | --- | ---: | ---: | --- | --- | --- |
| 1 | LMS enrollment / class administration | 28 | 21,4% | Lỗi/không thể enroll, thêm học viên hoặc giáo viên vào lớp | Dữ liệu lớp/học viên hoặc quy trình enrollment chưa chuẩn hóa | Chuẩn hóa form, tag, checklist và KB cho enrollment |
| 2 | Payment / contract / reconciliation | 24 | 18,3% | QR thanh toán, chênh lệch ECOUNT–Denise, lỗi payment/hợp đồng | Handoff thủ công hoặc dữ liệu liên hệ thống không đồng nhất | Checklist đối chiếu và escalation path cho payment/contract |
| 3 | Account / access / email | 22 | 16,8% | Cấp lại tài khoản, không đăng nhập, cấp/đặt lại Outlook | Cần xác minh theo từng loại account; không thể kết luận một root cause chung từ Subject | Thiết kế automation Login Issue / Account Reactivation theo Scenario 1 |
| 4 | TMS / attendance & timesheets | 18 | 13,7% | TMS không hiển thị công/thông tin, lỗi chấm công, tạo bù công | Có thể liên quan dữ liệu hiển thị hoặc quy tắc chấm công | Chuẩn hóa category theo symptom và evidence tối thiểu khi escalation |
| 5 | CRM / lead workflow | 17 | 13,0% | CRM không gọi/gửi tin nhắn được, chuyển trạng thái/import lead | Có thể liên quan workflow, data hoặc chức năng CRM | Chuẩn hóa taxonomy và hướng dẫn first-response cho CRM |

**Top 5 chiếm:** 109/131 ticket (83,2%).

`Other / manual review` có 12 ticket và `Test / data quality` có 10 ticket.
Hai nhóm này không được tính là vấn đề nghiệp vụ lặp lại.

## Impact và giới hạn dữ liệu

- 82/131 ticket (62,6%) có priority `High` hoặc `Urgent`.
- Dữ liệu không có user duy nhất, thời gian xử lý, thời gian giải quyết hoặc người
  phụ trách gốc; không suy ra được số người bị ảnh hưởng, hiệu suất đội ngũ hay
  chi phí thời gian.
- Ticket được import trong một đợt nên không dùng để kết luận xu hướng ticket
  lịch sử.
- Các nguyên nhân trong bảng là **giả thuyết**, không phải nguyên nhân gốc đã xác
  nhận.

## Automation target và action plan

- **YÊU CẦU MENTOR:** thực hiện Scenario 1 — Login Issue / Account Reactivation.
- Nhóm Account / access / email có 22 ticket (16,8%); đây là bằng chứng nhóm
  truy cập/tài khoản lặp lại, nhưng không phải nhóm có tần suất cao nhất.
- Automation là biện pháp vận hành; chưa khẳng định đã sửa nguyên nhân gốc LMS.

Kế hoạch hành động:

1. Chuẩn hóa taxonomy/tag khi tạo ticket mới.
2. Tạo KB/checklist cho năm nhóm vấn đề trên.
3. Thiết kế, test local/mock cho Login Issue trước.
4. Chỉ tích hợp Odoo, HR, LMS và email khi có đặc tả API thật.
5. Đo số lượng ticket và thời gian giải quyết bằng dữ liệu mới sau khi automation
   chạy.
