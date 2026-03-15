import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { randomUUID } from "node:crypto";

enum QuestionType {
  TEXT = "TEXT",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  CHECKBOX = "CHECKBOX",
  DATE = "DATE",
}

interface Question {
  id: string;
  title: string;
  type: QuestionType;
  options?: string[] | undefined;
  required?: boolean | undefined;
}

interface Form {
  id: string;
  title: string;
  description?: string | undefined;
  questions: Question[];
}

interface Answer {
  questionId: string;
  value: string[];
}

interface Response {
  id: string;
  formId: string;
  answers: Answer[];
}

interface Database {
  forms: Form[];
  responses: Response[];
}

const db: Database = {
  forms: [
    // {
    //   id: "1",
    //   title: "Перша форма",
    //   description: "Тестова форма для перевірки",
    //   questions: [
    //     {
    //       id: "q1",
    //       title: "Як вас звати?",
    //       type: QuestionType.TEXT,
    //       required: true,
    //     },
    //   ],
    // },
  ],
  responses: [],
};

const resolvers = {
  Query: {
    forms: (): Form[] => db.forms,
    form: (_: unknown, { id }: { id: string }): Form | undefined =>
      db.forms.find((f) => f.id === id),
    responses: (_: unknown, { formId }: { formId: string }): Response[] =>
      db.responses.filter((r) => r.formId === formId),
  },
  Mutation: {
    createForm: (
      _: unknown,
      {
        title,
        description,
        questions,
      }: {
        title: string;
        description?: string | undefined;
        questions: {
          title: string;
          type: QuestionType;
          options?: string[] | undefined;
          required?: boolean | undefined;
        }[];
      },
    ): Form => {
      const newForm: Form = {
        id: randomUUID(),
        title,
        description: description,
        questions: questions.map((q) => ({
          ...q,
          id: randomUUID(),
          options: q.options,
          required: q.required,
        })),
      };
      db.forms.push(newForm);
      return newForm;
    },
    submitResponse: (
      _: unknown,
      { formId, answers }: { formId: string; answers: Answer[] },
    ): Response => {
      const newResponse: Response = {
        id: randomUUID(),
        formId,
        answers,
      };
      db.responses.push(newResponse);
      return newResponse;
    },
    deleteForm: (_: unknown, { id }: { id: string }): boolean => {
      const initialLength = db.forms.length;
      db.forms = db.forms.filter((f) => f.id !== id);
      db.responses = db.responses.filter((r) => r.formId !== id);

      const wasDeleted = db.forms.length < initialLength;

      if (!wasDeleted) {
        console.log(`Форму з ID ${id} не знайдено.`);
      }

      return wasDeleted;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
