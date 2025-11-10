import * as AppSettings from "./app-settings.json";
import * as Users from "./users.json";
import * as RiskCodes from "./riskcode.json";

export class Configuration {
  appSettings: typeof AppSettings;
  users: typeof Users;
  riskCodes: typeof RiskCodes;
  readonly categories: string[];

  constructor() {
    this.appSettings = AppSettings;
    this.users = Users;
    this.riskCodes = RiskCodes;

    this.categories = [
      'ตัวเลือกยอดนิยม',
      'อาคารและสถานที่อยู่อาศัย',
      'ร้านค้าและบริการ',
      'โรงพยาบาลและสถานพยาบาล',
      'โรงงานและอุตสาหกรรม',
      'โกดังเก็บสินค้า',
      'การเกษตรและปศุสัตว์',
      'ตลาดและสถานที่ค้าขาย',
      'สถานที่บันเทิงและสันทนาการ',
      'สถานที่ราชการและการศึกษา',
      'ศาสนาและวัฒนธรรม',
      'เทคโนโลยีและโครงสร้างพื้นฐานดิจิทัล',
      'สถานที่ราชการและธนาคาร',
      'พลังงานและสถานีบริการเชื้อเพลิง',
      'อื่นๆ',
    ];
  }
}
