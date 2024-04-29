import CustomAvatar from '@/components/layout/custom-avatar';
import { COMPANIES_LIST_QUERY } from '@/graphql/queries';
import { SearchOutlined } from '@ant-design/icons';
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  useTable,
} from '@refinedev/antd';
import { getDefaultFilter, useGo } from '@refinedev/core';
import { Input, Space, Table } from 'antd';
import { Text } from '@/components/text';
import { currencyNumber } from '@/utilities';
import type { CompaniesListQuery } from '@/graphql/types';
import type { GetFieldsFromList } from '@refinedev/nestjs-query';
import dayjs from 'dayjs';
type Company = GetFieldsFromList<CompaniesListQuery>;

const CompanyList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps, filters } = useTable({
    resource: 'companies',
    pagination: {
      pageSize: 12,
    },
    sorters: {
      initial: [
        {
          field: 'createdAt',
          order: 'desc',
        },
      ],
    },
    filters: {
      initial: [
        {
          field: 'name',
          operator: 'contains',
          value: undefined,
        },
      ],
    },
    onSearch: (values: Company) => {
      return [
        {
          field: 'name',
          operator: 'contains',
          value: values.name,
        },
      ];
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    },
  });

  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => {
          return (
            <CreateButton
              onClick={() => {
                return go({
                  to: {
                    resource: 'companies',
                    action: 'create',
                  },
                  options: {
                    keepQuery: true,
                  },
                  type: 'replace',
                });
              }}
            />
          );
        }}
      >
        <Table
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
          }}
        >
          <Table.Column<Company>
            dataIndex="name"
            title="Company title"
            defaultFilteredValue={getDefaultFilter('id', filters)}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => {
              return (
                <FilterDropdown {...props}>
                  <Input placeholder="Search Company" />
                </FilterDropdown>
              );
            }}
            sorter
            render={(_value, record) => {
              return (
                <Space>
                  <CustomAvatar
                    shape="square"
                    name={record.name}
                    src={record.avatarUrl}
                  />
                  <Text style={{ whiteSpace: 'nowrap' }}>{record.name}</Text>
                </Space>
              );
            }}
          />
          <Table.Column<Company>
            dataIndex={'totalRevenue'}
            title="Open deals amount"
            sorter
            render={(_, company) => {
              return (
                <Text>
                  {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
                </Text>
              );
            }}
          />
          <Table.Column<Company>
            dataIndex={'updatedAt'}
            title="Updated"
            render={(_, company) => {
              return (
                <Text>
                  {dayjs(company.updatedAt).format('MMM DD, YYYY - HH:mm')}
                </Text>
              );
            }}
          />
          <Table.Column<Company>
            dataIndex={'id'}
            title="Actions"
            fixed="right"
            render={(value) => {
              return (
                <Space>
                  <EditButton hideText size="small" recordItemId={value} />
                  <DeleteButton hideText size="small" recordItemId={value} />
                </Space>
              );
            }}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};

export default CompanyList;
