
type ActionsType =  ReturnType<typeof addMessageActionCreator>

type InitialStateType = typeof initialState

const ADD_MESSAGE = 'dialogs/ADD-MESSAGE';

export const addMessageActionCreator = (newMessage: string, chatId: string) => ({type: ADD_MESSAGE, newMessage, chatId} as const)

let initialState = {
    dialogsData: [
        {id:1, name:'Dima', messages: [
            {id:1, userAuthId: true, text:'Hi'},
            {id:2, userAuthId: false, text:'Hello'},
            {id:3, userAuthId: true, text:'Chears'}
          ]},
        {id:2, name:'Kate', messages: [
            {id:1, userAuthId: false, text:'How are you?'},
            {id:2, userAuthId: true, text:'I am fine.'},
            {id:3, userAuthId: true, text:'And you?'}
          ]},
        {id:3, name:'Petr', messages: [
            {id:1, userAuthId: true, text:'I have came.'},
            {id:2, userAuthId: false, text:'Good.'},
            {id:3, userAuthId: false, text:'But I am not ready yet((.'}
          ]}
      ],
};

const dialogsReducer = (state=initialState, action: ActionsType): InitialStateType => {
    
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id:4,
                userAuthId: true,
                text: action.newMessage
            }
            return {
                    ...state,
                    dialogsData: state.dialogsData.map(user => user.id === parseInt(action.chatId)
                        ? {...user, messages: [...user.messages, newMessage]}
                         : user)
            }
            
        default:
            return state;
    };
}

export default dialogsReducer;