# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\student-management-e2e.spec.js >> Student Management End-to-End
- Location: test\e2e\student-management-e2e.spec.js:11:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'Mark Attendance' })
    - locator resolved to <a data-discover="true" href="/attendance/mark" class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 text-slate-300 hover:bg-white/10 hover:text-white">…</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed inset-0 bg-black/50 flex items-center justify-center">…</div> from <div class="flex flex-1 flex-col overflow-hidden">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed inset-0 bg-black/50 flex items-center justify-center">…</div> from <div class="flex flex-1 flex-col overflow-hidden">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    36 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="fixed inset-0 bg-black/50 flex items-center justify-center">…</div> from <div class="flex flex-1 flex-col overflow-hidden">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - complementary [ref=e5]:
    - generic [ref=e7]:
      - generic [ref=e9]:
        - img [ref=e11]
        - generic [ref=e14]:
          - paragraph [ref=e15]: SMS
          - paragraph [ref=e16]: Student Management
      - generic [ref=e17]:
        - link "Dashboard" [ref=e19] [cursor=pointer]:
          - /url: /dashboard
          - img [ref=e20]
          - generic [ref=e25]: Dashboard
        - generic [ref=e26]:
          - paragraph [ref=e27]: Administration
          - link "Courses" [ref=e28] [cursor=pointer]:
            - /url: /courses
            - img [ref=e29]
            - generic [ref=e31]: Courses
          - link "Mark Attendance" [ref=e32] [cursor=pointer]:
            - /url: /attendance/mark
            - img [ref=e33]
            - generic [ref=e36]: Mark Attendance
          - link "Attendance History" [ref=e37] [cursor=pointer]:
            - /url: /attendance/history
            - img [ref=e38]
            - generic [ref=e41]: Attendance History
          - link "Attendance Report" [ref=e42] [cursor=pointer]:
            - /url: /attendance/report
            - img [ref=e43]
            - generic [ref=e46]: Attendance Report
          - link "Marks Entry" [ref=e47] [cursor=pointer]:
            - /url: /marks/entry
            - img [ref=e48]
            - generic [ref=e51]: Marks Entry
          - link "Marks Report" [ref=e52] [cursor=pointer]:
            - /url: /marks/report
            - img [ref=e53]
            - generic [ref=e56]: Marks Report
          - link "Top Performers" [ref=e57] [cursor=pointer]:
            - /url: /marks/top-performers
            - img [ref=e58]
            - generic [ref=e61]: Top Performers
          - link "Student Risk Analytics" [ref=e62] [cursor=pointer]:
            - /url: /analytics/risk
            - img [ref=e63]
            - generic [ref=e65]: Student Risk Analytics
          - link "Teachers" [ref=e66] [cursor=pointer]:
            - /url: /admin/teachers
            - img [ref=e67]
            - generic [ref=e71]: Teachers
      - generic [ref=e73]:
        - generic [ref=e74]:
          - generic [ref=e75]: A
          - generic [ref=e76]:
            - paragraph [ref=e77]: admin1@gmail.com
            - paragraph [ref=e78]: ADMIN
        - button "Logout" [ref=e79]:
          - img [ref=e80]
          - text: Logout
  - generic [ref=e83]:
    - banner [ref=e84]:
      - generic [ref=e85]:
        - generic [ref=e87]:
          - heading "Overview" [level=1] [ref=e88]
          - paragraph [ref=e89]: Student Management Portal
        - generic [ref=e90]:
          - button "Notifications" [ref=e91]:
            - img [ref=e92]
          - generic [ref=e95]:
            - generic [ref=e96]: A
            - generic [ref=e97]:
              - paragraph [ref=e98]: admin1@gmail.com
              - paragraph [ref=e99]: ADMIN
    - main [ref=e100]:
      - generic [ref=e102]:
        - generic [ref=e103]:
          - generic [ref=e104]:
            - paragraph [ref=e105]: Course details
            - heading "Software Engineering" [level=1] [ref=e106]
            - paragraph [ref=e107]: Course overview and enrolled students.
          - button "Enroll Student" [ref=e109]:
            - img [ref=e110]
            - generic [ref=e113]: Enroll Student
        - generic [ref=e114]:
          - generic [ref=e118]:
            - generic [ref=e119]:
              - paragraph [ref=e120]: Course Code
              - paragraph [ref=e121]: SE101
              - paragraph [ref=e122]: Unique identifier
            - img [ref=e124]
          - generic [ref=e129]:
            - generic [ref=e130]:
              - paragraph [ref=e131]: Credits
              - paragraph [ref=e132]: "4"
              - paragraph [ref=e133]: Academic credit hours
            - img [ref=e135]
          - generic [ref=e141]:
            - generic [ref=e142]:
              - paragraph [ref=e143]: Instructor
              - paragraph [ref=e144]: Anil
              - paragraph [ref=e145]: Assigned teacher
            - img [ref=e147]
          - generic [ref=e153]:
            - generic [ref=e154]:
              - generic [ref=e155]:
                - paragraph [ref=e156]: Enrolled
                - paragraph [ref=e157]: "2"
                - paragraph [ref=e158]: Students in this course
              - img [ref=e160]
            - generic [ref=e165]:
              - img [ref=e166]
              - text: Active
        - generic [ref=e169]:
          - generic [ref=e170]:
            - generic [ref=e171]:
              - heading "Enrolled students" [level=3] [ref=e172]
              - paragraph [ref=e173]: Manage the roster for this course.
            - generic [ref=e176]:
              - img
              - textbox "Search student..." [ref=e177]
          - table [ref=e181]:
            - rowgroup [ref=e182]:
              - row "Name Email Status Actions" [ref=e183]:
                - columnheader "Name" [ref=e184]
                - columnheader "Email" [ref=e185]
                - columnheader "Status" [ref=e186]
                - columnheader "Actions" [ref=e187]
            - rowgroup [ref=e188]:
              - row "Harsh harsha@gmail.com Enrolled Remove" [ref=e189]:
                - cell "Harsh" [ref=e190]
                - cell "harsha@gmail.com" [ref=e191]
                - cell "Enrolled" [ref=e192]:
                  - generic [ref=e193]: Enrolled
                - cell "Remove" [ref=e195]:
                  - button "Remove" [ref=e197]:
                    - generic [ref=e198]: Remove
              - row "student_2 student2@gmail.com Enrolled Remove" [ref=e199]:
                - cell "student_2" [ref=e200]
                - cell "student2@gmail.com" [ref=e201]
                - cell "Enrolled" [ref=e202]:
                  - generic [ref=e203]: Enrolled
                - cell "Remove" [ref=e205]:
                  - button "Remove" [ref=e207]:
                    - generic [ref=e208]: Remove
        - generic [ref=e210]:
          - heading "Enroll Student" [level=2] [ref=e211]
          - combobox [ref=e212]:
            - option "Select Student"
            - option "Varun"
            - option "Purshu"
            - option "Kiran"
            - option "Yashwanth"
            - option "Ullas"
            - option "student_2" [selected]
            - option "Harsh"
            - option "Test Student"
            - option "Test Student"
            - option "Test Student"
            - option "Student 1783234845822"
            - option "Student 1783234935004"
            - option "Test Student"
            - option "Student 1783234967096"
            - option "Student 1783235170522"
            - option "Test Student"
            - option "Student 1783235326134"
            - option "Student 1783235659860"
            - option "Student 1783235666193"
            - option "Student 1783235784764"
            - option "Student 1783236015847"
          - generic [ref=e213]:
            - button "Cancel" [ref=e214]
            - button "Enroll" [active] [ref=e215]
```

# Test source

```ts
  1  | import { expect } from "@playwright/test";
  2  | 
  3  | export class DashboardPage {
  4  |   constructor(page) {
  5  |     this.page = page;
  6  | 
  7  |     this.dashboardLink = page.getByRole("link", { name: "Dashboard" });
  8  | 
  9  |     this.coursesLink = page.getByRole("link", { name: "Courses" });
  10 |     this.markAttendanceLink = page.getByRole("link", { name: "Mark Attendance" });
  11 |     this.attendanceHistoryLink = page.getByRole("link", { name: "Attendance History" });
  12 |     this.attendanceReportLink = page.getByRole("link", { name: "Attendance Report" });
  13 | 
  14 |     this.marksEntryLink = page.getByRole("link", { name: "Marks Entry" });
  15 |     this.marksReportLink = page.getByRole("link", { name: "Marks Report" });
  16 |     this.topPerformersLink = page.getByRole("link", { name: "Top Performers" });
  17 | 
  18 |     this.analyticsLink = page.getByRole("link", {
  19 |       name: "Student Risk Analytics",
  20 |     });
  21 | 
  22 |     this.teachersLink = page.getByRole("link", {
  23 |       name: "Teachers",
  24 |     });
  25 | 
  26 |     this.logoutButton = page.getByRole("button", {
  27 |       name: /logout/i,
  28 |     });
  29 |   }
  30 | 
  31 |   async verifyDashboardLoaded() {
  32 |     await expect(this.page).toHaveURL(/dashboard/);
  33 |     await expect(this.dashboardLink).toBeVisible();
  34 |   }
  35 | 
  36 |   async openCourses() {
  37 |     await this.coursesLink.click();
  38 |   }
  39 | 
  40 |   async openTeachers() {
  41 |     await this.teachersLink.click();
  42 |   }
  43 | 
  44 |   async openMarkAttendance() {
> 45 |     await this.markAttendanceLink.click();
     |                                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
  46 |   }
  47 | 
  48 |   async openAttendanceHistory() {
  49 |     await this.attendanceHistoryLink.click();
  50 |   }
  51 | 
  52 |   async openAttendanceReport() {
  53 |     await this.attendanceReportLink.click();
  54 |   }
  55 | 
  56 |   async openMarksEntry() {
  57 |     await this.marksEntryLink.click();
  58 |   }
  59 | 
  60 |   async openMarksReport() {
  61 |     await this.marksReportLink.click();
  62 |   }
  63 | 
  64 |   async openTopPerformers() {
  65 |     await this.topPerformersLink.click();
  66 |   }
  67 | 
  68 |   async openAnalytics() {
  69 |     await this.analyticsLink.click();
  70 |   }
  71 | 
  72 |   async logout() {
  73 |     await this.logoutButton.click();
  74 |   }
  75 | }
```