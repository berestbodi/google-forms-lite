export const typeDefs = `#graphql
  enum QuestionType {
    TEXT
    MULTIPLE_CHOICE
    CHECKBOX
    DATE
  }

  type Question {
    id: ID!
    title: String!
    type: QuestionType!
    options: [String!] # Для Multiple Choice та Checkbox
    required: Boolean
  }

  input QuestionInput {
    title: String!
    type: QuestionType!
    options: [String!]
    required: Boolean
  }

  type Form {
    id: ID!
    title: String!
    description: String
    questions: [Question!]!
  }

  type Answer {
    questionId: ID!
    value: [String!]!
  }

  input AnswerInput {
    questionId: ID!
    value: [String!]!
  }

  type Response {
    id: ID!
    formId: ID!
    answers: [Answer!]!
  }

  type Query {
    forms: [Form!]!
    form(id: ID!): Form
    responses(formId: ID!): [Response!]!
  }

  type Mutation {
    createForm(title: String!, description: String, questions: [QuestionInput!]): Form!
    submitResponse(formId: ID!, answers: [AnswerInput!]): Response!
		deleteForm(id: ID!): Boolean!
  }
`;
