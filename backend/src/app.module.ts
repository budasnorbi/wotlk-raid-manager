import { CharacterInfoModule } from "@modules/characterinfo/characterinfo.module"
import { CompareModule } from "@modules/compare/compare.module"
import { ParserModule } from "@modules/parser/parser.module"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: "default",
      type: "mysql",
      host: "db",
      port: parseInt(process.env.DB_PORT_CONTAINER),
      username: process.env.DB_USER_BACKEND,
      password: process.env.DB_PASS_BACKEND,
      database: process.env.DB_NAME_BACKEND,
      synchronize: false,
      autoLoadEntities: true
    }),
    ParserModule,
    CharacterInfoModule,
    CompareModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
