import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import friendsReducer from './friends-reducer';

let store = {
    _state : {
        profilePage: {
            postsData: [
                {id:1, message:'Hello!', likesCount:11},
                {id:2, message:'Good morning!', likesCount:120},
                {id:3, message:'How are you?', likesCount:6},
                {id:4, message:'Hi, guys!', likesCount:54},
            ],
            newPostText: 'ttt',
        },
        dialogsPage: {
            dialogsData: [
                {id:1, name:'Dima'},
                {id:2, name:'Kate'},
                {id:3, name:'Petr'}
              ],
            messagesData: [
                {id:1, name: 'me', message:'Hi'},
                {id:2, name: 'Dima', message:'Hello'},
                {id:3, name: 'me', message:'Chears'}
              ],
            newMessageText:'hi',
        },
        friendsNavbar: {
            friendsData: [
                {id:1, name:'Dima'},
                {id:2, name:'Kate'},
                {id:3, name:'Petr'},
                {id:4, name:'Alena'},
            ],
        }
    },

    _callSubscriber () {
        console.log('state has been changed')
    },

    getState () {
        return this._state;
    },

    subscribe (observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        profileReducer (this._state.profilePage, action);
        dialogsReducer (this._state.dialogsPage, action);
        friendsReducer (this._state.friendsNavbar, action);
        this._callSubscriber(this._state); 
    }
}

export default store;