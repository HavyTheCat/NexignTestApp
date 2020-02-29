import { Employee } from './employee';
import { NonAvailabilityType } from './non-availability-type';

export class NonAvailability {
    id: string;
    employee: Employee;
    nonAvailabilityType: NonAvailabilityType;
    startDate: Date;
    endDate: Date;

    constructor({id, employee, nonAvailabilityType}) {
        this.id = id;
        this.employee = employee;
        this.nonAvailabilityType = nonAvailabilityType;
    }
}
