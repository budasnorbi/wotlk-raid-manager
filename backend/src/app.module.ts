import { CharacterInfoModule } from "@modules/characterinfo/characterinfo.module"
import { CompareModule } from "@modules/compare/compare.module"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
@Module({
  imports: [
    CharacterInfoModule,
    CompareModule,
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
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
