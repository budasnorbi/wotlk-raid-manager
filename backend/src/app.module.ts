import { CharacterInfoModule } from "@modules/characterinfo/characterinfo.module"
import { ApiModule } from "@modules/api/api.module"
import { LocalDbModule } from "@modules/localdb/localdb.module"
import { ParserModule } from "@modules/parser/parser.module"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [
    LocalDbModule,
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
    CharacterInfoModule,
    ParserModule,
    ApiModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
