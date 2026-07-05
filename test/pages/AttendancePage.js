export class AttendancePage {
  constructor(page) {
    this.page = page;

    this.courseDropdown = page.getByRole("combobox");

    this.presentButtons = page.getByRole("button", {
      name: "Present",
    });
  }

  async markAttendance(courseId = "5") {
    // Select Course
    await this.courseDropdown.selectOption(courseId);

    // Mark first two students as Present
    await this.presentButtons.first().click();
    await this.presentButtons.nth(1).click();
  }
}