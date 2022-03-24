import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { Box, Card, Checkbox, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { IconCheck, IconMinus } from '@tabler/icons';

const CompaniesListResult = ({ companies, ...rest }) => {
    const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (companies.length) {
            companies.forEach((company) => (company.id = Math.random().toString()));
        }
    }, [companies]);

    const handleSelectAll = (event) => {
        let newSelectedCompanyIds;

        if (event.target.checked) {
            newSelectedCompanyIds = companies.map((company) => company.id);
        } else {
            newSelectedCompanyIds = [];
        }

        setSelectedCompanyIds(newSelectedCompanyIds);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedCompanyIds.indexOf(id);
        let newSelectedCompanyIds = [];

        if (selectedIndex === -1) {
            newSelectedCompanyIds = newSelectedCompanyIds.concat(selectedCompanyIds, id);
        } else if (selectedIndex === 0) {
            newSelectedCompanyIds = newSelectedCompanyIds.concat(selectedCompanyIds.slice(1));
        } else if (selectedIndex === selectedCompanyIds.length - 1) {
            newSelectedCompanyIds = newSelectedCompanyIds.concat(selectedCompanyIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedCompanyIds = newSelectedCompanyIds.concat(
                selectedCompanyIds.slice(0, selectedIndex),
                selectedCompanyIds.slice(selectedIndex + 1)
            );
        }

        setSelectedCompanyIds(newSelectedCompanyIds);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Card {...rest}>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedCompanyIds.length === companies.length}
                                        color="primary"
                                        indeterminate={selectedCompanyIds.length > 0 && selectedCompanyIds.length < companies.length}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Verified</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companies.slice(0, limit).map((company, index) => (
                                <TableRow hover key={index} selected={selectedCompanyIds.indexOf(company.id) !== -1}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedCompanyIds.indexOf(company.id) !== -1}
                                            onChange={(event) => handleSelectOne(event, company.id)}
                                            value="true"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Typography color="textPrimary" variant="body1">
                                                {company.company}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.role}</TableCell>
                                    <TableCell>
                                        {company.verified ? (
                                            <IconCheck stroke={1.5} size="1.3rem" />
                                        ) : (
                                            <IconMinus stroke={1.5} size="1.3rem" />
                                        )}
                                    </TableCell>
                                    <TableCell>{company.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={companies.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

CompaniesListResult.propTypes = {
    companies: PropTypes.array.isRequired
};

export default CompaniesListResult;
