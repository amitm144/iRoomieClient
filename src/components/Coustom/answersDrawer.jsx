import { GenericDrawer } from "./drawer";
import QuestionAnswerSummary from "./questionAnswerSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DrawerClose } from "@/components/ui/drawer";
import { ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

const QuestionnaireSummaryCard = ({ score }) => {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-blue-50 text-blue-900">
        <CardTitle className="text-xl flex items-center justify-center space-x-2">
          <span>ANSWERED QUESTIONS</span>

          <ClipboardList className="h-6 w-6" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 ">
        <div
          className={cn("grid gap-6 text-blue-900", !score && "lg:grid-cols-2")}
        >
          <div className="flex flex-col justify-center items-center  ">
            <h3 className="text-xl font-semibold mb-4 text-center">
              {"MATCHING SCORE"}
            </h3>
            <div className="text-3xl font-bold text-blue-900 mb-4">
              {score}%
            </div>
            <p className="text-sm text-center text-muted-foreground">
              {"Your matching score based on the questions you have answered."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
const MyQuestionnaireSummaryCard = ({ myAnswers, score }) => {
  const totalQuestions = 32;
  const answeredQuestions = Object.keys(myAnswers).length;
  const scorePercentage = Math.round(
    (answeredQuestions / totalQuestions) * 100
  );

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-blue-50 text-blue-900">
        <CardTitle className="text-xl flex items-center justify-center space-x-2">
          <span>ANSWERED QUESTIONS</span>

          <ClipboardList className="h-6 w-6" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 ">
        <div
          className={cn("grid gap-6 text-blue-900", !score && "lg:grid-cols-2")}
        >
          <div
            className={cn(
              "border-b pb-6",
              "lg:border-r lg:pr-6 lg:border-b-0 lg:pb-0"
            )}
          >
            <h3 className="lg:text-2xl text-lg font-semibold mb-4 text-blue-900">
              Questions Pro
            </h3>
            <div className="flex items-baseline space-x-2 mb-4">
              <span className="text-2xl font-bold">{answeredQuestions}</span>
              <span className="text-muted-foreground">/ {totalQuestions}</span>
            </div>
            <Progress value={scorePercentage} className="mb-2" />

            <p className="text-sm text-muted-foreground">
              Tip: Answer more questions to improve your Matches.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center  ">
            <h3 className="text-xl font-semibold mb-4 text-center">
              {"HIGHEST POSSIBLE MATCH"}
            </h3>
            <div className="text-3xl font-bold text-blue-900 mb-4">
              {scorePercentage}%
            </div>
            <p className="text-sm text-center text-muted-foreground">
              {
                "Your highest possible match based on the questions you have answered."
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function AnswersDrawer({ name, myAnswers, otherAnswers, score, myProfile }) {
  return (
    <div>
      <GenericDrawer
        triggerButton={
          <button className="w-full">
            {myProfile ? (
              <MyQuestionnaireSummaryCard myAnswers={myAnswers} />
            ) : (
              <QuestionnaireSummaryCard myAnswers={myAnswers} score={score} />
            )}
          </button>
        }
        title="Questionnaire Summary"
        description={`${name}'s Answers Summary`}
        footer={
          <>
            <DrawerClose asChild>
              <button variant="outline">Cancel</button>
            </DrawerClose>
          </>
        }
      >
        <QuestionAnswerSummary
          myAnswers={myAnswers}
          otherAnswers={otherAnswers}
          myProfile={myProfile}
        />
      </GenericDrawer>
    </div>
  );
}
