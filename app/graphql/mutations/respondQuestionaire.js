import gql from 'graphql-tag';

export default gql(`
mutation($_id: ID!, $questionaireTemplateType: String!, $username: String!, $questions: [QuestionaireQuestionInput]!){
    respondToQuestionaire(input:{
        _id: $_id,
        questionaireTemplateType: $questionaireTemplateType,
        username: $username,
        questions: $questions
    }){
        _id
        username
        questionaireTemplateType
        assignedAt
        assignedBy
        responded
        questions{
            title
            inputType
            response
            descriptionText
        }
    }
}
`);