export interface User {
    _id:string;
    username: string;
    name: string;
    tipo: string;
    appColor: string;
    appMode: string;
    email:string;
    estado:number;
    canManageUsers:Boolean;
    canManageLicences:Boolean;
    canManageClients:Boolean;
    canManagePermissions:Boolean;
    img:string;
  }
