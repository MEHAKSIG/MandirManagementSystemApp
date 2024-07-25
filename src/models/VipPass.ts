 interface VipEntry {
    vipPassId: number;
    mandirId: number;
    visitorName: string;
    gender: string;
    age: number;
    feesIfAny: number;
   
    visitDate: string;
   
   
    mobileNo: string;
    visitorCount: number;
    visitRemarks: string;
    
    crtUser: string;
    modUser: string;
}
export interface AccompanyEntry{
    detailId: number;
    vipPassId: number;
    visitorName: string;
    gender: string;
    age: number;
}

export interface VipPass {
    vipEntry: VipEntry,
    list : AccompanyEntry[]

}