import { Button, Box, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from 'use-http';
import { apiUrl } from '../../constants/api';
import {
  TPolicyholder,
  TAddress,
  TPolicyholderRowData,
  TResponseData,
  PolicyholderRowKeys,
} from './PolicyholdersView.types';
import InfoTable from '../InfoTable';
import InfoTableSkeleton from '../InfoTableSkeleton';
import { policyholder as policyholderMockData } from './PolicyholdersView.constants';

const getRows = (
  policyholder: TPolicyholderRowData
): { key: PolicyholderRowKeys; value: string }[] => {
  const keys = Object.keys(policyholder) as PolicyholderRowKeys[];

  return keys.map((key: PolicyholderRowKeys) => ({
    key,
    value: policyholder[key],
  }));
};

function PolicyholdersView() {
  const [policyholders, setPolicyholders] = useState<TPolicyholderRowData[]>(
    []
  );
  const { get, response, loading, post, error } = useFetch(apiUrl, {
    loading: true,
  });

  const fetchPolicyholders = async () => {
    const responseData: TResponseData = await get('/api/policyholders');

    if (response.ok)
      setPolicyholders(normalizeData(responseData?.policyHolders ?? []));
  };

  useEffect(() => {
    fetchPolicyholders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAddress = (address: TAddress) => {
    const { line1, line2, city, state, postalCode } = address;

    return `${line1}${
      line2 ? ', ' + line2 : ''
    }, ${city}, ${state} ${postalCode}`;
  };

  const normalizeData = (data: TPolicyholder[]): TPolicyholderRowData[] => {
    const normalizedData: TPolicyholderRowData[] = data.map(
      (d: TPolicyholder) => ({
        [PolicyholderRowKeys.name]: d.name,
        [PolicyholderRowKeys.age]: d.age.toString(),
        [PolicyholderRowKeys.address]: getAddress(d.address),
        [PolicyholderRowKeys.phoneNumber]: d.phoneNumber,
        [PolicyholderRowKeys.isPrimary]: d.isPrimary ? 'yes' : 'false',
      })
    );

    return normalizedData;
  };

  const onAddPolicyholderClick = async () => {
    const responseData: TResponseData = await post(
      '/api/policyholders',
      policyholderMockData
    );

    if (response.ok) {
      setPolicyholders(normalizeData(responseData?.policyHolders ?? []));
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
      {loading ? (
        <InfoTableSkeleton header="Policyholders" />
      ) : (
        policyholders.map((policyholder, i) => (
          <InfoTable
            key={`${policyholder[PolicyholderRowKeys.phoneNumber]}-${i}`}
            header={i === 0 ? 'Policyholders' : ''}
            rows={getRows(policyholder)}
          />
        ))
      )}
      {error && (
        <Alert severity="error">
          There was an issue processing your request.
        </Alert>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          disabled={policyholders.length > 1}
          onClick={onAddPolicyholderClick}
          size="large"
        >
          Add a policyholder
        </Button>
      </Box>
    </Box>
  );
}

export default PolicyholdersView;
