import { Classes } from "@type/classes"

export const getClassId = (classText: string): Classes => {
  let classId: Classes = -1
  if (classText.includes(Classes[Classes.warrior])) {
    classId = Classes.warrior
  } else if (classText.includes(Classes[Classes.paladin])) {
    classId = Classes.paladin
  } else if (classText.includes(Classes[Classes.hunter])) {
    classId = Classes.hunter
  } else if (classText.includes(Classes[Classes.rogue])) {
    classId = Classes.rogue
  } else if (classText.includes(Classes[Classes.priest])) {
    classId = Classes.priest
  } else if (classText.includes("death knight")) {
    classId = Classes.deathknight
  } else if (classText.includes(Classes[Classes.shaman])) {
    classId = Classes.shaman
  } else if (classText.includes(Classes[Classes.mage])) {
    classId = Classes.mage
  } else if (classText.includes(Classes[Classes.warlock])) {
    classId = Classes.warlock
  } else if (classText.includes(Classes[Classes.druid])) {
    classId = Classes.druid
  }

  return classId
}
