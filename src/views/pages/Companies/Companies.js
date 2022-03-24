import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import CompaniesListResult from 'ui-component/companies/CompaniesListResult';
import CompaniesListToolbar from 'ui-component/companies/CompaniesListToolbar';

const Countries = () => {
    const [companiesData, setCompaniesData] = useState([]);
    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const { data } = await axios.post('https://demo1779595.mockable.io/companies');
                setCompaniesData(data.companiesList);
            } catch (error) {}
        };
        fetchCountryData();
    }, []);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                pb: 8
            }}
        >
            <CompaniesListToolbar />
            <Box sx={{ mt: 3 }}>
                <CompaniesListResult companies={companiesData} />
            </Box>
        </Box>
    );
};

export default Countries;
