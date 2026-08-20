# BÁO CÁO TÌM HIỂU TEST-DRIVEN DEVELOPMENT (TDD)

## Ứng dụng TDD trong xây dựng công cụ dòng lệnh Ticket Manager

## Tóm tắt

Test-Driven Development (TDD) là phương pháp phát triển phần mềm trong đó lập trình viên viết kiểm thử trước khi viết phần mã nguồn đáp ứng yêu cầu. Quá trình được lặp lại qua ba bước **Red – Green – Refactor**: viết một kiểm thử thất bại, bổ sung lượng mã tối thiểu để kiểm thử vượt qua, sau đó cải tiến cấu trúc mã mà không làm thay đổi hành vi đã được kiểm chứng.

Báo cáo này trình bày nguyên lý cốt lõi của TDD; phân biệt kiểm thử đơn vị, kiểm thử tích hợp và kiểm thử đầu cuối; xác định các nội dung cần kiểm thử đối với một công cụ dòng lệnh; đồng thời minh họa cách áp dụng TDD cho ứng dụng **Ticket Manager CLI** viết bằng JavaScript/Node.js. Báo cáo cũng phân tích các lỗi thường gặp như kiểm thử quá mức, khẳng định quá yếu, kiểm thử chi tiết cài đặt, phụ thuộc trạng thái dùng chung và bỏ qua bước xác nhận kiểm thử thất bại.

**Từ khóa:** TDD, Red–Green–Refactor, unit test, integration test, end-to-end test, CLI, Node.js.

---

## Mục lục

1. [Giới thiệu](#1-giới-thiệu)
2. [Tổng quan về Test-Driven Development](#2-tổng-quan-về-test-driven-development)
3. [Chu trình Red – Green – Refactor](#3-chu-trình-red--green--refactor)
4. [Các cấp độ kiểm thử phần mềm](#4-các-cấp-độ-kiểm-thử-phần-mềm)
5. [Nội dung cần kiểm thử trong một công cụ CLI](#5-nội-dung-cần-kiểm-thử-trong-một-công-cụ-cli)
6. [Phân tích bài toán Ticket Manager CLI](#6-phân-tích-bài-toán-ticket-manager-cli)
7. [Áp dụng TDD cho chức năng thêm ticket](#7-áp-dụng-tdd-cho-chức-năng-thêm-ticket)
8. [Ví dụ kiểm thử bằng Node.js](#8-ví-dụ-kiểm-thử-bằng-nodejs)
9. [Chiến lược tổ chức và thực thi kiểm thử](#9-chiến-lược-tổ-chức-và-thực-thi-kiểm-thử)
10. [Các sai lầm thường gặp và cách khắc phục](#10-các-sai-lầm-thường-gặp-và-cách-khắc-phục)
11. [Đánh giá kết quả nghiên cứu](#11-đánh-giá-kết-quả-nghiên-cứu)
12. [Kết luận](#12-kết-luận)
13. [Tài liệu tham khảo](#13-tài-liệu-tham-khảo)

---

## 1. Giới thiệu

### 1.1. Bối cảnh

Công cụ dòng lệnh (Command-Line Interface – CLI) thường được sử dụng để tự động hóa công việc, xử lý tệp, quản lý dữ liệu hoặc hỗ trợ quy trình phát triển phần mềm. Mặc dù giao diện CLI có vẻ đơn giản, chương trình vẫn phải xử lý nhiều tình huống như:

- Người dùng nhập sai lệnh hoặc thiếu tham số.
- Dữ liệu không đúng định dạng.
- Tệp lưu trữ chưa tồn tại, bị hỏng hoặc không có quyền truy cập.
- Kết quả in ra không đúng nội dung hoặc sai luồng `stdout`/`stderr`.
- Chương trình trả về mã thoát không phù hợp.
- Dữ liệu bị mất hoặc không nhất quán sau nhiều thao tác liên tiếp.

Nếu chỉ kiểm tra thủ công, lập trình viên dễ bỏ sót trường hợp biên và phải lặp lại nhiều thao tác sau mỗi lần sửa mã. TDD giúp chuyển yêu cầu thành các kiểm thử có thể chạy tự động, từ đó tạo phản hồi sớm và giảm nguy cơ làm hỏng chức năng đã có.

### 1.2. Mục tiêu báo cáo

Báo cáo hướng đến các mục tiêu sau:

1. Trình bày khái niệm và nguyên lý cốt lõi của TDD.
2. Giải thích đầy đủ chu trình Red – Green – Refactor.
3. Phân biệt unit test, integration test và end-to-end test.
4. Xác định những hành vi quan trọng cần kiểm thử trong ứng dụng CLI.
5. Xây dựng danh sách trường hợp kiểm thử cho Ticket Manager CLI.
6. Minh họa quá trình phát triển một chức năng theo TDD bằng Node.js.
7. Phân tích các sai lầm thường gặp và đề xuất cách phòng tránh.

### 1.3. Phạm vi nghiên cứu

Báo cáo tập trung vào kiểm thử chức năng cho một ứng dụng CLI lưu dữ liệu ticket trong tệp JSON. Các ví dụ sử dụng:

- JavaScript theo chuẩn ES Modules.
- Trình chạy kiểm thử tích hợp sẵn của Node.js (`node:test`).
- Thư viện khẳng định `node:assert/strict`.
- Tệp tạm để cô lập dữ liệu của từng kiểm thử.
- Tiến trình con để kiểm thử chương trình qua giao diện dòng lệnh thực tế.

Báo cáo không đi sâu vào kiểm thử hiệu năng, kiểm thử bảo mật chuyên biệt hoặc triển khai một sản phẩm hoàn chỉnh.

### 1.4. Phương pháp thực hiện

Nội dung được xây dựng bằng các phương pháp:

- Tổng hợp khái niệm từ tài liệu về TDD và kiểm thử phần mềm.
- So sánh phạm vi, tốc độ và mục đích của các cấp độ kiểm thử.
- Phân tích yêu cầu của bài toán Ticket Manager CLI.
- Thiết kế trường hợp kiểm thử theo hành vi quan sát được.
- Minh họa chu trình TDD bằng mã kiểm thử và mã triển khai tối thiểu.

---

## 2. Tổng quan về Test-Driven Development

### 2.1. Khái niệm TDD

Test-Driven Development là cách phát triển phần mềm được dẫn dắt bởi kiểm thử. Với mỗi phần hành vi nhỏ, lập trình viên viết một kiểm thử mô tả kết quả mong muốn trước, quan sát kiểm thử thất bại, sau đó mới viết mã chức năng để làm cho kiểm thử vượt qua.

TDD không chỉ là “viết test trước”. Đây là một vòng phản hồi ngắn giúp thực hiện đồng thời ba hoạt động:

- **Làm rõ yêu cầu:** buộc người viết xác định đầu vào, đầu ra và quy tắc xử lý.
- **Thiết kế mã:** thúc đẩy việc tách chức năng thành các thành phần nhỏ, dễ sử dụng và ít phụ thuộc.
- **Ngăn lỗi hồi quy:** các kiểm thử cũ tiếp tục xác nhận hành vi sau khi mã được thay đổi.

Theo mô tả của Martin Fowler, trước khi lặp Red – Green – Refactor, nên lập danh sách các trường hợp kiểm thử dự kiến, chọn từng trường hợp phù hợp để triển khai và bổ sung thêm trường hợp mới khi hiểu rõ bài toán hơn [1].

### 2.2. Đặc điểm của TDD

Một quy trình TDD đúng thường có những đặc điểm sau:

- Phát triển theo từng bước nhỏ.
- Mỗi bước tập trung vào một hành vi rõ ràng.
- Luôn xác nhận kiểm thử có thể thất bại vì lý do mong đợi.
- Chỉ viết lượng mã vừa đủ để vượt qua kiểm thử hiện tại.
- Thường xuyên cải tiến thiết kế sau khi toàn bộ kiểm thử đã xanh.
- Bộ kiểm thử được chạy lại liên tục.

### 2.3. TDD khác với viết kiểm thử sau khi hoàn thành mã

| Tiêu chí | TDD | Viết kiểm thử sau |
|---|---|---|
| Thời điểm viết test | Trước mã chức năng | Sau khi chức năng đã được cài đặt |
| Vai trò của test | Dẫn dắt yêu cầu và thiết kế | Xác minh phần mã đã có |
| Khả năng phát hiện giao diện khó dùng | Sớm, ngay khi viết test đầu tiên | Muộn hơn, khi thiết kế đã hình thành |
| Nguy cơ test bám theo cài đặt | Thấp hơn nếu viết theo hành vi | Cao hơn vì người viết đã biết cấu trúc mã |
| Nhịp phản hồi | Ngắn và liên tục | Thường dài hơn |
| Phạm vi thay đổi mỗi bước | Nhỏ | Có thể lớn |

Viết kiểm thử sau vẫn có giá trị và tốt hơn việc không có kiểm thử. Tuy nhiên, điểm khác biệt quan trọng là trong TDD, kiểm thử tham gia vào quá trình hình thành thiết kế chứ không chỉ xác nhận sản phẩm sau cùng.

### 2.4. Lợi ích

- **Yêu cầu cụ thể hơn:** mỗi yêu cầu được chuyển thành ví dụ có thể kiểm chứng.
- **Phản hồi sớm:** lỗi được phát hiện ngay trong thay đổi nhỏ vừa thực hiện.
- **Thiết kế dễ kiểm thử:** các hàm và mô-đun thường có trách nhiệm rõ ràng hơn.
- **An toàn khi tái cấu trúc:** bộ kiểm thử giúp phát hiện hành vi bị thay đổi ngoài ý muốn.
- **Giảm lỗi hồi quy:** chức năng cũ được kiểm tra lại tự động.
- **Tài liệu sống:** tên kiểm thử và dữ liệu kiểm thử thể hiện cách hệ thống phải hoạt động.
- **Hỗ trợ bảo trì:** người sửa mã có thể nhanh chóng kiểm tra ảnh hưởng của thay đổi.

### 2.5. Hạn chế

- Cần thời gian học cách chia yêu cầu thành các bước nhỏ.
- Không thay thế việc phân tích yêu cầu, đánh giá trải nghiệm sử dụng hoặc kiểm thử thăm dò.
- Kiểm thử kém chất lượng vẫn có thể tạo cảm giác an toàn sai.
- Hệ thống phụ thuộc nhiều vào cơ sở dữ liệu, mạng hoặc giao diện bên ngoài có thể cần thiết kế bổ sung để dễ kiểm thử.
- Bộ kiểm thử lớn nhưng tổ chức không tốt sẽ chậm và tốn công bảo trì.

Vì vậy, hiệu quả của TDD phụ thuộc vào chất lượng trường hợp kiểm thử, cách tổ chức mã và khả năng duy trì vòng phản hồi nhanh.

---

## 3. Chu trình Red – Green – Refactor

### 3.1. Red – Viết một kiểm thử thất bại

Ở bước Red, lập trình viên chọn hành vi nhỏ tiếp theo và viết một kiểm thử mô tả hành vi đó. Kiểm thử phải thất bại vì chức năng chưa tồn tại hoặc chưa đáp ứng yêu cầu.

Mục đích của việc quan sát trạng thái đỏ:

- Chứng minh kiểm thử thực sự được chạy.
- Chứng minh kiểm thử có khả năng phát hiện hành vi còn thiếu.
- Phát hiện trường hợp test vượt qua nhầm do viết sai điều kiện.
- Xác nhận thông báo thất bại liên quan đúng đến yêu cầu đang phát triển.

Ví dụ yêu cầu: “Không được tạo ticket khi tiêu đề chỉ chứa khoảng trắng.” Kiểm thử đầu tiên cần gọi chức năng tạo ticket với tiêu đề không hợp lệ và mong đợi một lỗi rõ ràng.

### 3.2. Green – Viết mã tối thiểu để test vượt qua

Ở bước Green, mục tiêu là đưa hệ thống trở lại trạng thái tất cả kiểm thử đều vượt qua càng đơn giản càng tốt. Lập trình viên chưa cần tối ưu hay xây dựng một kiến trúc lớn cho những yêu cầu chưa xuất hiện.

Nguyên tắc:

- Không triển khai trước nhiều chức năng ngoài phạm vi kiểm thử hiện tại.
- Ưu tiên giải pháp rõ ràng và đúng hành vi.
- Chạy lại toàn bộ bộ kiểm thử, không chỉ test mới.
- Nếu test khác thất bại, phải xử lý trước khi tiếp tục.

“Mã tối thiểu” không có nghĩa là mã cẩu thả. Nó có nghĩa là không phỏng đoán quá nhiều yêu cầu tương lai.

### 3.3. Refactor – Cải tiến cấu trúc mã

Khi tất cả kiểm thử đã xanh, lập trình viên cải tiến cấu trúc mà không thay đổi hành vi bên ngoài. Một số hoạt động thường gặp:

- Đổi tên biến, hàm hoặc lớp để thể hiện đúng ý nghĩa.
- Loại bỏ đoạn mã lặp.
- Tách hàm dài thành các hàm nhỏ.
- Tách xử lý nghiệp vụ khỏi đọc/ghi tệp và giao diện CLI.
- Làm rõ thông báo lỗi.
- Đơn giản hóa điều kiện.

Trong suốt quá trình refactor, bộ kiểm thử phải được chạy thường xuyên. Nếu test chuyển đỏ, thay đổi gần nhất có thể đã làm thay đổi hành vi và cần được xem xét ngay.

### 3.4. Vòng lặp hoàn chỉnh

Một vòng TDD có thể mô tả như sau:

1. Chọn một yêu cầu nhỏ từ danh sách trường hợp kiểm thử.
2. Viết một kiểm thử cho hành vi đó.
3. Chạy test và xác nhận test thất bại đúng lý do.
4. Viết lượng mã tối thiểu để test vượt qua.
5. Chạy toàn bộ test và xác nhận tất cả đều xanh.
6. Cải tiến cấu trúc mã và mã kiểm thử.
7. Chạy lại test.
8. Chọn yêu cầu nhỏ tiếp theo và lặp lại.

Ví dụ thứ tự phát triển lệnh `ticket add`:

1. Tạo ticket với tiêu đề hợp lệ.
2. Tự động sinh mã định danh.
3. Gán trạng thái mặc định `open`.
4. Loại bỏ khoảng trắng thừa ở tiêu đề.
5. Từ chối tiêu đề rỗng.
6. Từ chối mức ưu tiên không hợp lệ.
7. Lưu ticket vào tệp JSON.
8. In kết quả thành công và trả mã thoát `0`.

Thứ tự trên đi từ hành vi đơn giản đến hành vi có thêm phụ thuộc, giúp lỗi dễ xác định hơn.

---

## 4. Các cấp độ kiểm thử phần mềm

ISTQB mô tả component testing (thường gọi là unit testing) là kiểm thử thành phần trong trạng thái cô lập; component integration testing tập trung vào giao diện và tương tác giữa các thành phần; system testing xem xét hành vi tổng thể của toàn hệ thống [2]. Trong phạm vi báo cáo, ba cấp độ được sử dụng là unit, integration và end-to-end.

### 4.1. Unit test – Kiểm thử đơn vị

Unit test kiểm tra một đơn vị logic nhỏ trong trạng thái được cô lập, chẳng hạn:

- Hàm kiểm tra tiêu đề ticket.
- Hàm chuẩn hóa mức ưu tiên.
- Hàm lọc ticket theo trạng thái.
- Hàm chuyển dữ liệu ticket thành dòng văn bản để hiển thị.

Đặc điểm:

- Chạy nhanh.
- Lỗi dễ khoanh vùng.
- Ít hoặc không sử dụng tài nguyên bên ngoài.
- Có thể chạy số lượng lớn sau mỗi thay đổi nhỏ.

Ví dụ: truyền `"   "` vào `normalizeTitle()` phải sinh lỗi `TITLE_REQUIRED`.

### 4.2. Integration test – Kiểm thử tích hợp

Integration test xác nhận các thành phần phối hợp đúng với nhau. Trong Ticket Manager, các điểm tích hợp quan trọng gồm:

- `TicketService` gọi `JsonTicketRepository`.
- Repository chuyển đối tượng thành JSON và ghi vào tệp.
- Dữ liệu được đọc lại từ tệp mà không mất trường.
- Cập nhật trạng thái được lưu bền vững qua nhiều lần đọc/ghi.

Integration test thường chậm hơn unit test vì sử dụng nhiều thành phần và có thể truy cập hệ thống tệp. Tuy nhiên, nó phát hiện được lỗi mà unit test không thấy, ví dụ sai đường dẫn, sai cấu trúc JSON hoặc lỗi kết nối giữa service và repository.

### 4.3. End-to-end test – Kiểm thử đầu cuối

End-to-end (E2E) test chạy hệ thống qua giao diện gần giống người dùng thật. Với CLI, test sẽ khởi chạy một tiến trình như:

```bash
node src/cli.js add "Sửa lỗi đăng nhập" --priority high
```

Sau đó test kiểm tra:

- Mã thoát của tiến trình.
- Nội dung trên `stdout`.
- Nội dung trên `stderr`.
- Dữ liệu thực sự được lưu.
- Kết quả của lệnh tiếp theo, chẳng hạn `list` hoặc `show`.

E2E test có độ tin cậy hành vi cao nhưng chậm hơn, khó khoanh vùng lỗi hơn và cần chuẩn bị môi trường cẩn thận. Vì vậy chỉ nên dùng cho các luồng nghiệp vụ quan trọng.

### 4.4. Bảng so sánh

| Tiêu chí | Unit test | Integration test | End-to-end test |
|---|---|---|---|
| Phạm vi | Một hàm/lớp/mô-đun nhỏ | Nhiều thành phần phối hợp | Toàn bộ chương trình qua CLI |
| Mục tiêu | Xác nhận logic cục bộ | Xác nhận sự kết nối | Xác nhận hành vi người dùng |
| Tốc độ | Nhanh nhất | Trung bình | Chậm nhất |
| Cô lập lỗi | Dễ | Trung bình | Khó hơn |
| Phụ thuộc hệ thống tệp | Thường không | Có thể có | Thường có |
| Độ ổn định | Cao nếu viết tốt | Khá cao | Dễ bị ảnh hưởng bởi môi trường hơn |
| Ví dụ | Kiểm tra tiêu đề rỗng | Lưu và đọc JSON | Chạy `add`, sau đó chạy `list` |

### 4.5. Cách kết hợp các cấp độ

Không nên chọn một cấp độ duy nhất cho mọi trường hợp. Một bộ kiểm thử cân bằng thường có:

- Nhiều unit test cho các quy tắc nghiệp vụ và trường hợp biên.
- Một lượng vừa phải integration test cho các ranh giới quan trọng.
- Một số ít E2E test cho các luồng chính.

Mô hình kim tự tháp kiểm thử nhấn mạnh việc có nhiều kiểm thử mức thấp hơn và ít kiểm thử mức cao hơn [3]. Đây là định hướng chứ không phải tỷ lệ bắt buộc; số lượng thực tế phụ thuộc vào rủi ro và kiến trúc của dự án.

---

## 5. Nội dung cần kiểm thử trong một công cụ CLI

### 5.1. Lệnh, tham số và tùy chọn

Cần xác nhận:

- Lệnh hợp lệ được nhận diện đúng.
- Lệnh không tồn tại bị từ chối.
- Tham số bắt buộc không được bỏ trống.
- Tùy chọn có giá trị mặc định đúng.
- Tùy chọn viết sai hoặc giá trị không hợp lệ tạo thông báo phù hợp.
- `--help` hiển thị hướng dẫn và `--version` hiển thị phiên bản.

### 5.2. Kiểm tra dữ liệu đầu vào

Đầu vào CLI đều bắt đầu dưới dạng chuỗi nên cần kiểm tra và chuyển đổi cẩn thận:

- Chuỗi rỗng hoặc chỉ có khoảng trắng.
- Chuỗi quá dài.
- Số âm hoặc giá trị không phải số.
- Ngày tháng sai định dạng.
- Giá trị ngoài tập cho phép.
- Ký tự Unicode và dấu tiếng Việt.
- Nội dung chứa dấu nháy, xuống dòng hoặc ký tự đặc biệt.

Kiểm thử nên tập trung vào quy tắc nghiệp vụ thay vì chỉ kiểm tra parser có nhận được chuỗi hay không.

### 5.3. Kết quả hiển thị

Kết quả của CLI là một phần giao diện công khai. Cần kiểm tra:

- Thông báo thành công có đủ thông tin quan trọng.
- Danh sách có thứ tự và định dạng nhất quán.
- Trường hợp không có dữ liệu có thông báo rõ ràng.
- Lỗi được ghi vào `stderr`, kết quả thông thường được ghi vào `stdout`.
- Không in stack trace hoặc thông tin nội bộ cho người dùng cuối nếu không cần thiết.

Không nên khẳng định toàn bộ một đoạn văn bản dài nếu chỉ một phần nội dung mang ý nghĩa nghiệp vụ. Kiểm tra quá chi tiết về khoảng trắng hoặc màu sắc có thể làm test dễ hỏng khi định dạng thay đổi hợp lệ.

### 5.4. Mã thoát

Mã thoát giúp script và hệ điều hành biết lệnh thành công hay thất bại:

- `0`: thực thi thành công.
- Khác `0`: có lỗi.

Dự án có thể quy ước mã lỗi cụ thể, ví dụ:

| Mã thoát | Ý nghĩa đề xuất |
|---:|---|
| 0 | Thành công |
| 1 | Lỗi chung |
| 2 | Dữ liệu đầu vào không hợp lệ |
| 3 | Không tìm thấy tài nguyên |
| 4 | Lỗi lưu trữ |

Quy ước cần được tài liệu hóa và kiểm thử nhất quán.

### 5.5. Lưu trữ tệp

Khi ứng dụng dùng JSON, cần kiểm thử:

- Tệp chưa tồn tại được khởi tạo hợp lệ.
- Tệp rỗng được xử lý theo quy ước.
- Dữ liệu ghi xong có thể đọc lại.
- Thêm dữ liệu mới không làm mất dữ liệu cũ.
- Cập nhật đúng ticket theo ID.
- JSON bị hỏng tạo lỗi dễ hiểu và không bị ghi đè âm thầm.
- Lỗi quyền truy cập được xử lý.
- Thao tác ghi hạn chế nguy cơ để lại tệp dở dang.

Mỗi test phải sử dụng thư mục tạm riêng, tuyệt đối không dùng tệp dữ liệu thật của người dùng.

### 5.6. Trường hợp lỗi và trường hợp biên

Danh sách tối thiểu gồm:

- ID không tồn tại.
- Thêm hai ticket có nội dung giống nhau nếu hệ thống cho phép.
- Xóa ticket đã hoàn thành.
- Đánh dấu hoàn thành một ticket vốn đã hoàn thành.
- Danh sách rỗng.
- Tệp có số lượng ticket lớn.
- Tiêu đề có dấu tiếng Việt.
- Hệ thống tệp trả lỗi.
- Tiến trình bị gián đoạn trong lúc ghi.

### 5.7. Tính độc lập và khả năng lặp lại

Một test tốt phải cho cùng kết quả khi chạy riêng lẻ, chạy cùng toàn bộ bộ test hoặc thay đổi thứ tự. Để đạt được điều này:

- Không dùng chung tệp dữ liệu có thể bị sửa.
- Không phụ thuộc thời gian thực nếu không kiểm soát đồng hồ.
- Không phụ thuộc thứ tự chạy test.
- Xóa tài nguyên tạm sau khi hoàn thành.
- Cố định dữ liệu đầu vào và đường dẫn trong phạm vi test.

---

## 6. Phân tích bài toán Ticket Manager CLI

### 6.1. Mô tả bài toán

Ticket Manager là công cụ dòng lệnh cho phép người dùng quản lý danh sách công việc hoặc lỗi cần xử lý. Dữ liệu được lưu trong một tệp JSON cục bộ.

Các lệnh chính:

```bash
ticket add "Tiêu đề" --priority high
ticket list
ticket list --status open
ticket show <id>
ticket done <id>
ticket delete <id>
```

### 6.2. Mô hình dữ liệu

Mỗi ticket có cấu trúc đề xuất:

```json
{
  "id": 1,
  "title": "Sửa lỗi đăng nhập",
  "priority": "high",
  "status": "open",
  "createdAt": "2026-08-19T10:00:00.000Z",
  "completedAt": null
}
```

Quy tắc nghiệp vụ:

- `id` là số nguyên dương và không trùng.
- `title` bắt buộc, được loại bỏ khoảng trắng ở hai đầu.
- `priority` chỉ nhận `low`, `medium`, `high`; mặc định là `medium`.
- `status` ban đầu là `open`.
- Khi hoàn thành, `status` chuyển thành `done` và `completedAt` có giá trị.
- ID không tồn tại phải tạo lỗi `TICKET_NOT_FOUND`.

### 6.3. Yêu cầu chức năng

#### Lệnh `add`

- Nhận tiêu đề và mức ưu tiên.
- Kiểm tra dữ liệu hợp lệ.
- Tạo ID mới.
- Ghi ticket vào tệp.
- In thông báo thành công.

#### Lệnh `list`

- Hiển thị toàn bộ ticket.
- Cho phép lọc theo trạng thái.
- Thông báo rõ khi danh sách rỗng.

#### Lệnh `show`

- Hiển thị chi tiết ticket theo ID.
- Báo lỗi nếu ID không tồn tại.

#### Lệnh `done`

- Chuyển ticket từ `open` sang `done`.
- Lưu thời điểm hoàn thành.
- Không tạo bản ghi mới.

#### Lệnh `delete`

- Xóa đúng ticket theo ID.
- Không ảnh hưởng ticket còn lại.
- Báo lỗi nếu ID không tồn tại.

### 6.4. Danh sách trường hợp kiểm thử

| Mã | Cấp độ | Trường hợp | Kết quả mong đợi |
|---|---|---|---|
| UT-01 | Unit | Chuẩn hóa tiêu đề hợp lệ | Trả về tiêu đề đã `trim` |
| UT-02 | Unit | Tiêu đề rỗng | Sinh lỗi `TITLE_REQUIRED` |
| UT-03 | Unit | Priority không được truyền | Dùng `medium` |
| UT-04 | Unit | Priority không hợp lệ | Sinh lỗi `INVALID_PRIORITY` |
| UT-05 | Unit | Lọc theo `open` | Chỉ trả ticket đang mở |
| UT-06 | Unit | Đánh dấu ticket hoàn thành | Trạng thái là `done` |
| IT-01 | Integration | Lưu ticket đầu tiên | Tệp chứa đúng một ticket |
| IT-02 | Integration | Lưu hai ticket liên tiếp | Dữ liệu cũ vẫn còn nguyên |
| IT-03 | Integration | Đọc tệp chưa tồn tại | Trả danh sách rỗng |
| IT-04 | Integration | Đọc JSON bị hỏng | Sinh lỗi lưu trữ rõ ràng |
| IT-05 | Integration | Cập nhật ticket theo ID | Đúng bản ghi được thay đổi |
| E2E-01 | E2E | Chạy lệnh `add` hợp lệ | Exit `0`, có thông báo, dữ liệu được lưu |
| E2E-02 | E2E | Chạy `add` với tiêu đề rỗng | Exit `2`, lỗi trên `stderr` |
| E2E-03 | E2E | Chạy `list` khi rỗng | Exit `0`, thông báo không có ticket |
| E2E-04 | E2E | `add` rồi `list` | Danh sách chứa ticket vừa thêm |
| E2E-05 | E2E | `done` với ID không tồn tại | Exit `3`, thông báo phù hợp |
| E2E-06 | E2E | Lệnh không tồn tại | Exit khác `0`, hiển thị hướng dẫn ngắn |

Danh sách này là điểm khởi đầu. Trong quá trình phát triển, có thể bổ sung trường hợp mới khi xuất hiện quy tắc hoặc lỗi chưa được mô tả.

---

## 7. Áp dụng TDD cho chức năng thêm ticket

Phần này minh họa vòng TDD cho quy tắc: **không được tạo ticket khi tiêu đề rỗng hoặc chỉ chứa khoảng trắng**.

### 7.1. Bước Red

Viết kiểm thử trước:

```js
// test/ticket-service.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createTicket } from '../src/ticket-service.js';

test('từ chối tiêu đề chỉ chứa khoảng trắng', () => {
  assert.throws(
    () => createTicket({ title: '   ' }),
    (error) => error.code === 'TITLE_REQUIRED'
  );
});
```

Chạy:

```bash
node --test
```

Ở thời điểm này, test phải thất bại do mô-đun hoặc hàm chưa tồn tại. Đây là trạng thái Red hợp lệ.

### 7.2. Bước Green

Viết lượng mã tối thiểu:

```js
// src/ticket-service.js
export function createTicket({ title }) {
  if (!title || title.trim() === '') {
    const error = new Error('Tiêu đề ticket là bắt buộc');
    error.code = 'TITLE_REQUIRED';
    throw error;
  }

  return { title: title.trim() };
}
```

Chạy lại toàn bộ test. Khi test vượt qua, yêu cầu nhỏ hiện tại đã được đáp ứng.

### 7.3. Bổ sung hành vi tiếp theo

Yêu cầu tiếp theo: ticket hợp lệ phải có mức ưu tiên mặc định `medium` và trạng thái `open`.

```js
test('tạo ticket với giá trị mặc định', () => {
  const ticket = createTicket({ title: '  Sửa lỗi đăng nhập  ' });

  assert.equal(ticket.title, 'Sửa lỗi đăng nhập');
  assert.equal(ticket.priority, 'medium');
  assert.equal(ticket.status, 'open');
});
```

Cập nhật mã vừa đủ:

```js
export function createTicket({ title, priority = 'medium' }) {
  if (!title || title.trim() === '') {
    const error = new Error('Tiêu đề ticket là bắt buộc');
    error.code = 'TITLE_REQUIRED';
    throw error;
  }

  return {
    title: title.trim(),
    priority,
    status: 'open'
  };
}
```

### 7.4. Bước Refactor

Khi có thêm quy tắc priority, có thể tách phần xác thực để mỗi hàm có trách nhiệm rõ ràng:

```js
const ALLOWED_PRIORITIES = new Set(['low', 'medium', 'high']);

function normalizeTitle(title) {
  const normalized = title?.trim();

  if (!normalized) {
    const error = new Error('Tiêu đề ticket là bắt buộc');
    error.code = 'TITLE_REQUIRED';
    throw error;
  }

  return normalized;
}

function normalizePriority(priority = 'medium') {
  if (!ALLOWED_PRIORITIES.has(priority)) {
    const error = new Error('Mức ưu tiên không hợp lệ');
    error.code = 'INVALID_PRIORITY';
    throw error;
  }

  return priority;
}

export function createTicket({ title, priority }) {
  return {
    title: normalizeTitle(title),
    priority: normalizePriority(priority),
    status: 'open'
  };
}
```

Sau refactor, toàn bộ test phải tiếp tục vượt qua. Hành vi bên ngoài không thay đổi, nhưng mã rõ ràng hơn và dễ bổ sung quy tắc mới.

### 7.5. Ý nghĩa của ví dụ

Ví dụ cho thấy:

- Kiểm thử mô tả yêu cầu trước khi cài đặt.
- Mỗi lần chỉ bổ sung một phần hành vi nhỏ.
- Lỗi được biểu diễn bằng mã ổn định thay vì phụ thuộc hoàn toàn vào câu chữ.
- Việc refactor được thực hiện khi đã có lưới an toàn từ test.
- Các hàm nghiệp vụ không phụ thuộc trực tiếp vào `process.argv` hoặc hệ thống tệp nên dễ unit test.

---

## 8. Ví dụ kiểm thử bằng Node.js

Node.js cung cấp trình chạy kiểm thử qua mô-đun `node:test`, có thể khởi chạy bằng cờ `--test` [4]. Các ví dụ dưới đây dùng `node:assert/strict` để thực hiện khẳng định nghiêm ngặt [5].

### 8.1. Cấu trúc dự án đề xuất

```text
ticket-manager/
├── package.json
├── src/
│   ├── cli.js
│   ├── ticket-service.js
│   └── json-ticket-repository.js
└── test/
    ├── ticket-service.test.js
    ├── json-ticket-repository.test.js
    └── cli.e2e.test.js
```

`package.json`:

```json
{
  "name": "ticket-manager",
  "type": "module",
  "scripts": {
    "test": "node --test",
    "test:watch": "node --test --watch"
  }
}
```

### 8.2. Unit test cho quy tắc priority

```js
// test/ticket-service.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createTicket } from '../src/ticket-service.js';

test('dùng priority medium khi người dùng không truyền priority', () => {
  const ticket = createTicket({ title: 'Viết tài liệu' });

  assert.equal(ticket.priority, 'medium');
});

test('chấp nhận ba mức priority hợp lệ', () => {
  for (const priority of ['low', 'medium', 'high']) {
    const ticket = createTicket({ title: 'Công việc', priority });
    assert.equal(ticket.priority, priority);
  }
});

test('từ chối priority ngoài tập cho phép', () => {
  assert.throws(
    () => createTicket({ title: 'Công việc', priority: 'urgent' }),
    (error) => error.code === 'INVALID_PRIORITY'
  );
});
```

Các test này chỉ kiểm tra hành vi công khai của `createTicket`; chúng không kiểm tra tên hàm phụ hoặc số lần một hàm nội bộ được gọi.

### 8.3. Integration test cho repository JSON

```js
// test/json-ticket-repository.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { JsonTicketRepository } from '../src/json-ticket-repository.js';

test('lưu và đọc lại ticket từ tệp JSON', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'ticket-test-'));
  t.after(() => rm(directory, { recursive: true, force: true }));

  const filePath = join(directory, 'tickets.json');
  const repository = new JsonTicketRepository(filePath);

  const ticket = {
    id: 1,
    title: 'Sửa lỗi đăng nhập',
    priority: 'high',
    status: 'open'
  };

  await repository.saveAll([ticket]);
  const result = await repository.findAll();

  assert.deepEqual(result, [ticket]);

  const rawFile = await readFile(filePath, 'utf8');
  assert.deepEqual(JSON.parse(rawFile), [ticket]);
});
```

Thư mục tạm giúp test không chạm vào dữ liệu thật và không phụ thuộc vào lần chạy trước. Node.js cung cấp các API hệ thống tệp như `mkdtemp` để tạo thư mục tạm phục vụ trường hợp này [6].

### 8.4. Integration test khi tệp chưa tồn tại

```js
test('trả danh sách rỗng khi tệp dữ liệu chưa tồn tại', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'ticket-test-'));
  t.after(() => rm(directory, { recursive: true, force: true }));

  const repository = new JsonTicketRepository(
    join(directory, 'not-created-yet.json')
  );

  assert.deepEqual(await repository.findAll(), []);
});
```

Test này mô tả hành vi khởi tạo của ứng dụng. Nếu quy ước là tệp chưa tồn tại phải được xem như danh sách rỗng thì repository cần xử lý riêng lỗi `ENOENT`, nhưng không được nuốt mọi lỗi hệ thống tệp khác.

### 8.5. E2E test cho lệnh `add`

```js
// test/cli.e2e.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

test('lệnh add lưu ticket và trả mã thành công', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'ticket-e2e-'));
  t.after(() => rm(directory, { recursive: true, force: true }));

  const dataFile = join(directory, 'tickets.json');

  const stdout = execFileSync(
    process.execPath,
    [
      'src/cli.js',
      'add',
      'Sửa lỗi đăng nhập',
      '--priority',
      'high'
    ],
    {
      encoding: 'utf8',
      env: {
        ...process.env,
        TICKET_DATA_FILE: dataFile
      }
    }
  );

  assert.match(stdout, /Đã tạo ticket #1/);

  const tickets = JSON.parse(await readFile(dataFile, 'utf8'));
  assert.equal(tickets.length, 1);
  assert.equal(tickets[0].title, 'Sửa lỗi đăng nhập');
  assert.equal(tickets[0].priority, 'high');
});
```

Mô-đun `node:child_process` cho phép tạo tiến trình con, phù hợp để chạy CLI như một người dùng thực [7]. Biến môi trường `TICKET_DATA_FILE` giúp E2E test hướng chương trình đến tệp tạm.

### 8.6. E2E test cho đầu vào không hợp lệ

```js
import { spawnSync } from 'node:child_process';

test('lệnh add trả mã 2 khi tiêu đề rỗng', () => {
  const result = spawnSync(
    process.execPath,
    ['src/cli.js', 'add', '   '],
    { encoding: 'utf8' }
  );

  assert.equal(result.status, 2);
  assert.match(result.stderr, /Tiêu đề ticket là bắt buộc/);
  assert.equal(result.stdout, '');
});
```

Test kiểm tra cả ba tín hiệu quan trọng: mã thoát, `stderr` và `stdout`. Nếu chỉ kiểm tra câu thông báo mà bỏ qua mã thoát, script gọi CLI có thể hiểu nhầm lỗi là thành công.

### 8.7. Nguyên tắc rút ra từ các ví dụ

- Logic nghiệp vụ nên nằm trong hàm hoặc service độc lập với giao diện CLI.
- Đường dẫn lưu trữ cần có khả năng cấu hình để test dùng tệp tạm.
- Unit test xác nhận quy tắc nhỏ; integration test xác nhận đọc/ghi; E2E test xác nhận luồng hoàn chỉnh.
- Khẳng định nên kiểm tra kết quả quan trọng và mã lỗi ổn định.
- Mỗi test tự chuẩn bị và tự dọn dữ liệu của nó.

---

## 9. Chiến lược tổ chức và thực thi kiểm thử

### 9.1. Phân chia trách nhiệm trong kiến trúc

Cấu trúc nên tách thành ba phần:

| Thành phần | Trách nhiệm | Cấp độ kiểm thử chính |
|---|---|---|
| CLI adapter | Đọc đối số, gọi service, in kết quả, đặt mã thoát | E2E và một số unit test parser |
| Ticket service | Thực hiện quy tắc nghiệp vụ | Unit test |
| Repository | Đọc và ghi dữ liệu | Integration test |

Sự phân tách này tránh việc đặt toàn bộ logic vào một tệp `cli.js`, đồng thời giúp phần lớn quy tắc được kiểm tra nhanh mà không phải khởi tạo tiến trình con.

### 9.2. Thứ tự chạy trong quá trình phát triển

1. Chạy test đang phát triển để nhận phản hồi nhanh.
2. Sau khi chuyển sang Green, chạy toàn bộ unit test.
3. Trước khi hoàn thành chức năng, chạy unit và integration test.
4. Trước khi commit hoặc bàn giao, chạy toàn bộ bộ test gồm E2E.

Lệnh cơ bản:

```bash
npm test
```

Chạy một tệp cụ thể:

```bash
node --test test/ticket-service.test.js
```

### 9.3. Tiêu chí hoàn thành một chức năng

Một chức năng được xem là hoàn thành khi:

- Yêu cầu và trường hợp biên đã được xác định.
- Kiểm thử mới đã từng thất bại đúng lý do.
- Mã chức năng làm kiểm thử vượt qua.
- Toàn bộ kiểm thử cũ vẫn vượt qua.
- Mã đã được refactor nếu có trùng lặp hoặc trách nhiệm chưa rõ.
- Không sử dụng dữ liệu thật trong test.
- Thông báo lỗi và mã thoát nhất quán.
- Tên test mô tả hành vi rõ ràng.

### 9.4. Quản lý dữ liệu kiểm thử

- Tạo dữ liệu tối thiểu cần thiết cho từng test.
- Dùng factory nhỏ nếu nhiều test cần cùng cấu trúc ticket.
- Không dùng một tệp JSON cố định cho nhiều test ghi đồng thời.
- Cố định thời gian qua hàm `clock` được truyền vào nếu cần kiểm tra `createdAt`.
- Dọn thư mục tạm bằng hook sau test.
- Không phụ thuộc vào dữ liệu do một test trước tạo ra.

### 9.5. Đánh giá độ bao phủ

Độ bao phủ mã nguồn có thể chỉ ra dòng hoặc nhánh chưa được chạy, nhưng không chứng minh rằng yêu cầu đã được kiểm thử đúng. Một test có thể chạy qua nhiều dòng mà không có khẳng định có ý nghĩa.

Vì vậy cần đánh giá đồng thời:

- Các quy tắc nghiệp vụ có test hay chưa.
- Đường thành công và đường lỗi có được kiểm tra hay chưa.
- Các ranh giới tích hợp quan trọng có test hay chưa.
- Khẳng định có đủ mạnh để phát hiện kết quả sai hay không.
- Bộ test có nhanh, độc lập và ổn định hay không.

---

## 10. Các sai lầm thường gặp và cách khắc phục

### 10.1. Kiểm thử quá mức

**Biểu hiện:** kiểm tra mọi getter, mọi dòng mã hoặc nhiều biến thể không làm thay đổi rủi ro.

**Hậu quả:** bộ test dài, chậm, tốn công bảo trì nhưng không tăng nhiều độ tin cậy.

**Cách khắc phục:** ưu tiên hành vi có giá trị, quy tắc nghiệp vụ, trường hợp biên và ranh giới tích hợp. Không cần test trực tiếp phần mã quá đơn giản nếu đã được bao phủ qua hành vi quan trọng.

### 10.2. Khẳng định quá yếu

**Ví dụ yếu:**

```js
assert.ok(ticket);
```

Test trên vẫn vượt qua nếu ticket có sai tiêu đề, sai trạng thái hoặc thiếu priority.

**Ví dụ tốt hơn:**

```js
assert.equal(ticket.title, 'Sửa lỗi đăng nhập');
assert.equal(ticket.status, 'open');
assert.equal(ticket.priority, 'high');
```

Khẳng định cần đủ cụ thể để thất bại khi hành vi nghiệp vụ sai.

### 10.3. Kiểm thử chi tiết cài đặt

**Biểu hiện:** test yêu cầu một hàm nội bộ phải được gọi đúng số lần hoặc kiểm tra trực tiếp biến riêng tư dù kết quả bên ngoài không đổi.

**Hậu quả:** một lần refactor hợp lệ cũng làm hàng loạt test thất bại.

**Cách khắc phục:** kiểm tra đầu vào, đầu ra, trạng thái lưu trữ và lỗi có thể quan sát được. Chỉ kiểm tra tương tác nội bộ khi tương tác đó thực sự là một phần hợp đồng quan trọng.

### 10.4. Chỉ kiểm tra đường thành công

**Biểu hiện:** chỉ test `add` với dữ liệu hợp lệ.

**Hậu quả:** chương trình có thể xử lý sai tiêu đề rỗng, priority lạ, ID không tồn tại hoặc tệp hỏng.

**Cách khắc phục:** với mỗi yêu cầu, xem xét ít nhất ba nhóm: trường hợp bình thường, giá trị biên và lỗi dự kiến.

### 10.5. Không xác nhận bước Red

**Biểu hiện:** test mới vượt qua ngay lần chạy đầu tiên nhưng vẫn tiếp tục viết mã.

**Hậu quả:** có thể test không chạy, điều kiện sai hoặc hành vi đã tồn tại mà người viết không biết.

**Cách khắc phục:** quan sát thông báo thất bại và bảo đảm nó liên quan đúng đến chức năng còn thiếu trước khi sang Green.

### 10.6. Viết quá nhiều mã ở bước Green

**Biểu hiện:** từ một test nhỏ nhưng triển khai luôn nhiều lớp và tùy chọn chưa có yêu cầu.

**Hậu quả:** tăng độ phức tạp, kéo dài vòng phản hồi và tạo mã không được kiểm chứng bởi yêu cầu hiện tại.

**Cách khắc phục:** chỉ giải quyết trường hợp đang đỏ; bổ sung yêu cầu tiếp theo bằng test tiếp theo.

### 10.7. Bỏ qua Refactor

**Biểu hiện:** sau khi test xanh, lập tức chuyển sang chức năng mới.

**Hậu quả:** mã lặp và cấu trúc tạm thời tích tụ, làm các vòng sau khó hơn.

**Cách khắc phục:** sau mỗi vài bước Green, xem xét tên gọi, trách nhiệm, trùng lặp và phụ thuộc; thực hiện thay đổi nhỏ trong khi giữ test xanh.

### 10.8. Dùng chung trạng thái giữa các test

**Biểu hiện:** nhiều test cùng ghi vào `tickets.json`.

**Hậu quả:** test có thể vượt qua khi chạy riêng nhưng thất bại khi chạy cùng nhau hoặc chạy song song.

**Cách khắc phục:** mỗi test dùng thư mục tạm và dữ liệu riêng; luôn dọn tài nguyên sau test.

### 10.9. Lạm dụng mock

**Biểu hiện:** thay thế hầu hết thành phần bằng mock, kể cả các đối tượng đơn giản có thể dùng thật.

**Hậu quả:** test chỉ chứng minh các mock được cấu hình đúng, trong khi sự tích hợp thật vẫn có thể lỗi.

**Cách khắc phục:** dùng đối tượng thật khi nhanh và dễ kiểm soát; chỉ mock ranh giới chậm, không ổn định hoặc khó tạo trong môi trường test. Bổ sung integration test cho ranh giới quan trọng.

### 10.10. Khẳng định toàn bộ văn bản đầu ra

**Biểu hiện:** so sánh chính xác cả đoạn `stdout` dài, bao gồm khoảng trắng và màu ANSI.

**Hậu quả:** thay đổi trình bày nhỏ làm test thất bại dù hành vi vẫn đúng.

**Cách khắc phục:** kiểm tra phần nội dung có ý nghĩa, mã thoát và dữ liệu lưu. Chỉ dùng snapshot hoặc so sánh toàn văn khi định dạng chính xác là yêu cầu công khai.

### 10.11. Nuốt mọi lỗi hệ thống tệp

**Biểu hiện:** bắt mọi ngoại lệ và trả về danh sách rỗng.

**Hậu quả:** tệp JSON hỏng hoặc lỗi quyền truy cập bị che giấu, có thể dẫn đến mất dữ liệu.

**Cách khắc phục:** chỉ chuyển `ENOENT` thành danh sách rỗng nếu đó là quy ước; các lỗi khác phải được ánh xạ thành lỗi lưu trữ rõ ràng và trả mã thoát phù hợp.

---

## 11. Đánh giá kết quả nghiên cứu

### 11.1. Kiến thức đạt được

Qua nghiên cứu có thể rút ra các nội dung chính:

- TDD là phương pháp phát triển được dẫn dắt bởi kiểm thử, không chỉ là hoạt động kiểm tra sau khi viết mã.
- Red – Green – Refactor tạo vòng phản hồi ngắn và kiểm soát phạm vi thay đổi.
- Unit, integration và E2E test giải quyết các loại rủi ro khác nhau và cần được kết hợp.
- CLI phải được kiểm tra cả logic, lưu trữ, nội dung xuất, luồng xuất và mã thoát.
- Tách CLI adapter, service và repository giúp chương trình dễ kiểm thử hơn.
- Kiểm thử tốt phải độc lập, có khẳng định đủ mạnh và tập trung vào hành vi.

### 11.2. Khả năng áp dụng cho Ticket Manager CLI

Quy trình đề xuất khi bắt đầu triển khai:

1. Liệt kê các lệnh và quy tắc nghiệp vụ.
2. Chọn chức năng nhỏ nhất là tạo ticket hợp lệ trong bộ nhớ.
3. Phát triển lần lượt các quy tắc tiêu đề, priority và trạng thái theo TDD.
4. Xây dựng repository bằng integration test với tệp tạm.
5. Kết nối CLI với service và repository.
6. Viết một số E2E test cho `add`, `list`, `done` và đường lỗi quan trọng.
7. Chạy toàn bộ bộ test sau mỗi lần refactor hoặc trước khi bàn giao.

### 11.3. Tiêu chí tự kiểm tra báo cáo

- [x] Trình bày khái niệm và nguyên tắc TDD.
- [x] Giải thích Red – Green – Refactor.
- [x] So sánh unit, integration và end-to-end test.
- [x] Xác định nội dung cần kiểm thử trong CLI.
- [x] Cung cấp danh sách test cho Ticket Manager.
- [x] Minh họa kiểm thử bằng JavaScript/Node.js.
- [x] Phân tích sai lầm thường gặp và cách tránh.
- [x] Đưa ra chiến lược áp dụng vào quá trình phát triển.

---

## 12. Kết luận

TDD là một phương pháp phát triển phần mềm dựa trên vòng phản hồi ngắn. Bằng cách viết kiểm thử thất bại trước, triển khai lượng mã tối thiểu để vượt qua và sau đó cải tiến cấu trúc, lập trình viên có thể làm rõ yêu cầu, giới hạn phạm vi thay đổi và duy trì sự an toàn khi refactor.

Đối với Ticket Manager CLI, unit test phù hợp để kiểm tra quy tắc tiêu đề, priority và trạng thái; integration test phù hợp để kiểm tra service phối hợp với lưu trữ JSON; E2E test phù hợp để xác nhận lệnh, nội dung xuất, mã thoát và dữ liệu cuối cùng. Ba cấp độ bổ sung cho nhau, trong đó nên ưu tiên nhiều kiểm thử nhỏ và nhanh, đồng thời giữ một số kiểm thử đầu cuối cho các luồng quan trọng.

Hiệu quả của TDD không nằm ở số lượng test mà nằm ở chất lượng phản hồi mà test mang lại. Bộ kiểm thử cần tập trung vào hành vi có giá trị, đủ mạnh để phát hiện sai lệch, độc lập với nhau và không bám quá chặt vào chi tiết cài đặt. Khi được áp dụng có kỷ luật, TDD vừa hỗ trợ kiểm soát chất lượng vừa thúc đẩy thiết kế chương trình rõ ràng, dễ thay đổi và dễ bảo trì.

---

## 13. Tài liệu tham khảo

1. Martin Fowler, **Test Driven Development**, 2023.  
   <https://martinfowler.com/bliki/TestDrivenDevelopment.html>

2. International Software Testing Qualifications Board, **Certified Tester Foundation Level Syllabus v4.0.1**, mục 2.2.1 – Test Levels, 2024.  
   <https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf>

3. Martin Fowler, **Test Pyramid**, 2012.  
   <https://martinfowler.com/bliki/TestPyramid.html>

4. Node.js, **Test runner documentation**.  
   <https://nodejs.org/api/test.html>

5. Node.js, **Assert documentation**.  
   <https://nodejs.org/api/assert.html>

6. Node.js, **File system documentation**.  
   <https://nodejs.org/api/fs.html>

7. Node.js, **Child process documentation**.  
   <https://nodejs.org/api/child_process.html>

8. Ham Vocke, **The Practical Test Pyramid**, Martin Fowler, 2018.  
   <https://martinfowler.com/articles/practical-test-pyramid.html>
