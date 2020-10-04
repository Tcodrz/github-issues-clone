import { User } from './user.interface';


export interface IssueEvent {
    id?: number;
    node_id?: string;
    url?: string;
    actor?: User;
    event?: string;
    created_at?: string;
    comment?: string;
    label?: {
        name: string,
        color: string
    };
    rename?: {
        from?: string,
        to?: string
    };
    edit?: boolean;
}
