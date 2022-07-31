import { useEffect, useState } from 'react';
import useFetch from 'use-http';
import { apiUrl } from '../../constants/api';
import { TPolicyholder } from '../../types';

function PolicyholdersView() {
  const [policyholders, setPolicyholders] = useState<TPolicyholder[]>([]);
  const { get, response } = useFetch(apiUrl);

  const fetchPolicyHolders = async () => {
    const responseData: TPolicyholder[] = await get('/api/policyholders');
    if (response.ok) setPolicyholders(responseData);
  };

  useEffect(() => {
    fetchPolicyHolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default PolicyholdersView;
