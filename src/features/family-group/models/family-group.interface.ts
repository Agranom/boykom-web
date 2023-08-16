export interface IGroupMember  {
    userId: string;
    isAccepted: boolean;
}

export interface IFamilyGroup {
    id: string;
    ownerId: string;
    members: IGroupMember[];
}
