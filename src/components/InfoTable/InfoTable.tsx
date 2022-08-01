import {
  TableRow,
  TableCell,
  BoxProps,
} from '@mui/material';
import InfoTableFrame from '../InfoTableFrame';

type TInfoTable = {
  header: string;
  rows: { key: string; value: string | number }[];
} & BoxProps;

function InfoTable({ header, rows, ...boxProps }: TInfoTable) {
  return (
    <InfoTableFrame {...boxProps} header={header}>
      {rows.map(({ key, value }) => (
        <TableRow key={key}>
          <TableCell>{key}</TableCell>
          <TableCell sx={{ whiteSpace: 'pre' }}>{value}</TableCell>
        </TableRow>
      ))}
    </InfoTableFrame>
  );
}
export default InfoTable;
