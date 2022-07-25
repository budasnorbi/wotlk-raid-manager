import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("filtered_talents", { schema: "raid" })
export class FilteredTalents {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number

  @Column("int", { name: "classId" })
  classId: number

  @Column("int", { name: "spellId" })
  spellId: number
}
