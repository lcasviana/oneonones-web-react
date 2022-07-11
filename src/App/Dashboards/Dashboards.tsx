import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDashboards } from '../../Core/Redux/Effects';
import { AppState } from '../../Core/Redux/Store';
import { Shell } from '../Shared/Shell';
import { ComposeModel } from '../../Common/Models/Dashboard/ComposeModel';
import { FrequencyEnum } from '../../Common/Enumerations/FrequencyEnum';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppDispatch } from '../../Core/Redux/Hooks';

export const Dashboads: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDashboards());
  }, [dispatch]);
  const dashboards = useSelector((state: AppState) => state.dashboards);

  const oneonones = dashboards?.map(d => d.oneonones)?.flat(1)?.filter((c, i, a) => i === a.findIndex(t => c.oneonone.id === t.oneonone.id)) ?? [];
  // const areLate = oneonones.filter(o => !!o.status?.isLate);
  const notLate = oneonones.filter(o => !o.status?.isLate);

  const columns: GridColDef[] = [
    { field: 'id', hide: true },
    { field: 'leader', headerName: 'Leader', flex: 1 },
    { field: 'led', headerName: 'Led', flex: 1 },
    { field: 'last', headerName: 'Last Occurr.', flex: 1 },
    { field: 'isLate', headerName: 'Is Late?', flex: 1 },
  ];

  const status = (compose: ComposeModel): string => {
    if (compose.oneonone.frequency === FrequencyEnum.Occasionally) return 'Occasionally';
    if (!compose.status) return 'No Meetings';
    return compose.status.isLate ? 'Is Late' : 'Up To Date';
  };

  const table = oneonones.map(o => ({
    id: o.oneonone.id,
    leader: o.oneonone.leader.name,
    led: o.oneonone.led.name,
    last: o.status ? new Date(o.status.lastOccurrence).toISOString().substr(0, 10) : '',
    isLate: status(o),
  }));

  return (
    <>
      <Shell title={'Dashboards'} />
      <main className="pa3">

        {!!dashboards?.length &&
          <>
            <section className="mb3">
              <Typography variant="h5">
                Up to date: {notLate.length * 100 / oneonones.length}%
              </Typography>
            </section>

            <div style={{ height: 420, width: '100%' }}>
              <DataGrid
                rows={table}
                columns={columns}
                disableSelectionOnClick
              />
            </div>
          </>
        }
        {!dashboards?.length && <Typography variant="body1" style={{ marginTop: '0.5rem' }}>Empty</Typography>}
      </main>
    </>
  );
};