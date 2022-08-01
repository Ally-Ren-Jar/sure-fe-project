import {
  TableContainer,
  Table as MuiTable,
  Paper,
  TableBody,
  Typography,
  BoxProps,
  Box,
} from '@mui/material';

type TInfoTableContainer = {
  header: string;
  children: React.ReactNode,
} & BoxProps;

function InfoTableFrame({
  header,
  children,
  ...boxProps
}: TInfoTableContainer) {
  return (
    <Box {...boxProps}>
      <Typography variant="h5" textAlign="left" marginBottom="16px">
        {header}
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: { xs: 300, sm: 650 } }}>
        <MuiTable sx={{ minWidth: { sm: 440, md: 650 } }} aria-label="table">
          <TableBody>
            {children}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Box>
  );
}
export default InfoTableFrame;
