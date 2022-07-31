import {
  TableContainer,
  Table as MuiTable,
  Paper,
  TableBody,
  TableRow,
  Typography,
  BoxProps,
  Box,
  Skeleton,
} from '@mui/material';

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
    <Box {...boxProps}>
      <Typography variant="h5" textAlign="left" marginBottom="16px">
        {header}
      </Typography>
      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: { sm: 650 } }} aria-label="table">
          <TableBody>
            {Array.from(new Array(rowCount)).map((_item, i) => (
              <TableRow key={i}>
                <Typography sx={{ p: '1rem' }} component="td">
                  <Skeleton />
                </Typography>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Box>
  );
}

export default InfoTableSkeleton;
