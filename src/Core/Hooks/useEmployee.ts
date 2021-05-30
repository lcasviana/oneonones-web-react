import { useEffect, useState } from 'react';
import { EmployeeModel } from '../../Common/Models/Employee/EmployeeModel';
import { EmployeesRepository } from '../Repositories/EmployeesRepository';

export const useEmployeeAll = (): EmployeeModel[] | undefined => {
  const [employees, setEmployees] = useState<EmployeeModel[] | undefined>(undefined);

  useEffect(() => {
    EmployeesRepository.obtainAll()
      .then((employees) => setEmployees(employees));
  }, [])

  return employees;
}