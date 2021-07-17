import { useEffect, useState } from 'react';
import { EmployeeModel } from '../../Common/Models/Employee/EmployeeModel';
import { UserModel } from '../../Common/Models/UserModel';
import { EmployeesRepository } from '../Repositories/EmployeesRepository';

export const useEmployeeAll = (user: UserModel): EmployeeModel[] | undefined => {
  const [employees, setEmployees] = useState<EmployeeModel[] | undefined>(undefined);

  useEffect(() => {
    EmployeesRepository.obtainAll()
      .then((employees) => setEmployees(employees.filter(e => e.id !== user.id)));
  }, [user])

  return employees;
}