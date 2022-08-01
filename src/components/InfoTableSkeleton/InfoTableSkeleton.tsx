import {
  TableRow,
  Typography,
  BoxProps,
  Skeleton,
} from '@mui/material';
import InfoTableFrame from '../InfoTableFrame';

type TTInfoTableSkeleton = {
  rowCount?: number;
  header: string;
} & BoxProps;

function InfoTableSkeleton({
  header,
  rowCount = 5,
  ...boxProps
}: TTInfoTableSkeleton) {
  return (
    <InfoTableFrame header={header} {...boxProps}>
      {Array.from(new Array(rowCount)).map((_item, i) => (
        <TableRow key={i}>
          <Typography sx={{ p: '1rem' }} component="td">
            <Skeleton />
          </Typography>
        </TableRow>
      ))}
    </InfoTableFrame>
  );
}

export default InfoTableSkeleton;
