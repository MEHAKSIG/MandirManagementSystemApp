export interface Donation {
    donationId: number;
    mandirId: number;
    donationDate: string;
    
    donationFrom: string;
    donationAmount: number;
    paymentMode: string;
    instrumentNo: string;
    insturmentDate: string;
    Remarks: string;

    crtUser: string;
    crtTime:string;
    // modUser: string;
}
