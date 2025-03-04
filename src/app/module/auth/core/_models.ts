export interface AuthModel {
    api_token: string
    refreshToken?: string
  }

export interface UserModel {
    id: number
    name: string | number;
    password: string ;
    iphone: number;
    Role: string
    auth?: AuthModel;
  }

/* data: {

    token: 

      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgwLCJpYXQiOjE3NDA2OTk1MzcsImV4cCI6MTc0MTU2MzUzN30.WMaGrPq63wFELMSW7ObE1xabRJdcRvHftOhE8HfqTbk',

    userclient: [ { id: 180, name: 'David', iphone: '65373622' } ]

  },

  status: 201,

  statusText: 'Created',

  headers: AxiosHeaders {

    'content-length': '213',

    'content-type': 'application/json; charset=utf-8'

  }, */