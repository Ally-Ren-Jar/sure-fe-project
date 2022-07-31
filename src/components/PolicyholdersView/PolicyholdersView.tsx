import { useEffect, useState } from 'react';
import useFetch from 'use-http';
import { apiUrl } from '../../constants/api';
import { TPolicyholder, TAddress } from '../../types';
import InfoTable from '../InfoTable';
import InfoTableSkeleton from '../InfoTableSkeleton';

type TPolicyholderRowData = {
  [key in PolicyholderRowKeys]: string;
};

enum PolicyholderRowKeys {
  name = 'Name',
  age = 'Age',
  address = 'Address',
  phoneNumber = 'Phone number',
  isPrimary = 'Primary policyholder?',
}

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
  const { get, response, loading } = useFetch(apiUrl);

  const fetchPolicyholders = async () => {
    const responseData: { policyHolders: TPolicyholder[] } = await get(
      '/api/policyholders'
    );
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

  return (
    <>
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
    </>
  );
}

export default PolicyholdersView;
