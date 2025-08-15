import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { RoleModule } from './role/role.module';

import { IndustryModule } from './industry/industry.module';
import { UserRoleModule } from './user-role/user-role.module';
import { CreateObjectiveModule } from './create-objective/create-objective.module';
import { CreateKeyResultModule } from './create-key-result/create-key-result.module';
import { ObjectiveEvaluatorModule } from './objective-evaluator/objective-evaluator.module';
import { KeyResultModule } from './key-result/key-result.module';
import { KeywordBaseInnovativeModule } from './keywordbase-innovative/keywordbase-innovative.module';
import { EvaluateInitiativesModule } from './evaluate-initiatives/evaluate-initiatives.module';
import { FinalOkrEvaluationModule } from './final-okr-evaluation/final-okr-evaluation.module';
import { UserModule } from './user/user.module';
import { CreateChallengeModule } from './create-challenge/create-challenge.module';
import { SoloScoreModule } from './solo-score/solo-score.module';


@Module({
  imports: [
    GameModule,
    RoleModule,
    IndustryModule,
    CreateObjectiveModule,
    UserRoleModule,
    CreateKeyResultModule,
    ObjectiveEvaluatorModule,
    KeyResultModule,
    KeywordBaseInnovativeModule,
    EvaluateInitiativesModule,
    FinalOkrEvaluationModule,
    UserModule,
    CreateChallengeModule,
    SoloScoreModule
  ],
})
export class AppModule { }
