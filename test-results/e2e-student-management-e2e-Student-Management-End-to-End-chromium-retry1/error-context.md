# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\student-management-e2e.spec.js >> Student Management End-to-End
- Location: test\e2e\student-management-e2e.spec.js:11:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('table')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('table')

```

```yaml
- complementary:
  - paragraph: SMS
  - paragraph: Student Management
  - link "Dashboard":
    - /url: /dashboard
  - paragraph: Administration
  - link "Courses":
    - /url: /courses
  - link "Mark Attendance":
    - /url: /attendance/mark
  - link "Attendance History":
    - /url: /attendance/history
  - link "Attendance Report":
    - /url: /attendance/report
  - link "Marks Entry":
    - /url: /marks/entry
  - link "Marks Report":
    - /url: /marks/report
  - link "Top Performers":
    - /url: /marks/top-performers
  - link "Student Risk Analytics":
    - /url: /analytics/risk
  - link "Teachers":
    - /url: /admin/teachers
  - text: A
  - paragraph: admin1@gmail.com
  - paragraph: ADMIN
  - button "Logout"
- banner:
  - heading "Attendance History" [level=1]
  - paragraph: Review attendance history
  - button "Notifications"
  - text: A
  - paragraph: admin1@gmail.com
  - paragraph: ADMIN
- main:
  - paragraph: Records
  - heading "Attendance History" [level=1]
  - paragraph: Review attendance records and export them.
  - button "Export CSV" [disabled]
  - heading "Filters" [level=3]
  - paragraph: Select course, date and search student.
  - text: Course
  - combobox:
    - option "Select Course" [selected]
    - option "Data Structures Algorthim"
    - option "Database Management System"
    - option "C programming"
    - option "Java Object Oriented Programming"
    - option "Software Engineering"
    - option "Software Engineering 1783233942116"
    - option "Software Engineering 1783234964795"
    - option "Software Engineering 1783235173441"
    - option "Software Engineering 1783235324310"
    - option "Software Engineering 1783235328370"
  - text: Date
  - textbox: 2026-07-06
  - text: Search Student
  - textbox "Search..."
  - heading "Select a Course" [level=3]
  - paragraph: Choose a course to view attendance.
- status: Attendance saved successfully
```

# Test source

```ts
  1  | import { expect } from "@playwright/test";
  2  | 
  3  | export class AttendancePage {
  4  |   constructor(page) {
  5  |     this.page = page;
  6  | 
  7  |     // Mark Attendance
  8  |     this.courseDropdown = page.getByRole("combobox");
  9  |     this.presentButtons = page.getByRole("button", { name: "Present" });
  10 |     this.absentButtons = page.getByRole("button", { name: "Absent" });
  11 |     this.saveButton = page.getByRole("button", { name: "Save Attendance" });
  12 | 
  13 |     // Attendance History
  14 |     this.searchBox = page.getByPlaceholder("Search student...");
  15 |     this.exportButton = page.getByRole("button", {
  16 |       name: "Export CSV",
  17 |     });
  18 | 
  19 |     this.dateInput = page.locator('input[type="date"]');
  20 | 
  21 |     this.historyTable = page.locator("table");
  22 |   }
  23 | 
  24 |   // ----------------------------
  25 |   // Mark Attendance
  26 |   // ----------------------------
  27 | 
  28 |   async markAttendance(courseId = "5") {
  29 |     await this.courseDropdown.selectOption(courseId);
  30 | 
  31 |     await this.presentButtons.first().click();
  32 |     await this.presentButtons.nth(1).click();
  33 | 
  34 |     if (await this.saveButton.isVisible().catch(() => false)) {
  35 |       await this.saveButton.click();
  36 |     }
  37 |   }
  38 | 
  39 |   // ----------------------------
  40 |   // Attendance History
  41 |   // ----------------------------
  42 | 
  43 |   async openHistory() {
  44 |     await this.page.getByRole("link", {
  45 |       name: "Attendance History",
  46 |     }).click();
  47 |   }
  48 | 
  49 |   async selectCourse(courseId) {
  50 |     await this.courseDropdown.selectOption(courseId);
  51 |   }
  52 | 
  53 |   async selectDate(date) {
  54 |     await this.dateInput.fill(date);
  55 |   }
  56 | 
  57 |   async searchStudent(studentName) {
  58 |     await this.searchBox.fill(studentName);
  59 |   }
  60 | 
  61 |   async verifyHistoryLoaded() {
> 62 |     await expect(this.historyTable).toBeVisible();
     |                                     ^ Error: expect(locator).toBeVisible() failed
  63 |   }
  64 | 
  65 |   async exportCsv() {
  66 |     const downloadPromise =
  67 |       this.page.waitForEvent("download");
  68 | 
  69 |     await this.exportButton.click();
  70 | 
  71 |     await downloadPromise;
  72 |   }
  73 | }
```