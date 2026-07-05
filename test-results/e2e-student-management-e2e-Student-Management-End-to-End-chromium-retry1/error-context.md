# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\student-management-e2e.spec.js >> Student Management End-to-End
- Location: test\e2e\student-management-e2e.spec.js:11:1

# Error details

```
Error: locator.click: Target page, context or browser has been closed
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
    23 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="fixed inset-0 bg-black/50 flex items-center justify-center">…</div> from <div class="flex flex-1 flex-col overflow-hidden">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

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
     |                                   ^ Error: locator.click: Target page, context or browser has been closed
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