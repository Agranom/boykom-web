export interface IGroupMember  {
    id: string;
    isAccepted: boolean;
}

export interface IFamilyGroup {
    id: string;
    ownerId: string;
    members: IGroupMember[];
}
