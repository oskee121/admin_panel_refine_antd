import { Form, Input, Modal, Select } from 'antd';
import CompanyList from './list';
import { useModalForm, useSelect } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { CREATE_COMPANY_MUTATION } from '@/graphql/mutations';
import { USERS_SELECT_QUERY } from '@/graphql/queries';
import { SelectOptionWithAvatar } from '@/components/layout/select-option-with-avatar';
import type { GetFieldsFromList } from '@refinedev/nestjs-query';
import type { UsersSelectQuery } from '@/graphql/types';

const Create = () => {
  const go = useGo();
  const goToCompaniesListPage = () => {
    return go({
      to: { resource: 'companies', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };
  const { formProps, modalProps } = useModalForm({
    action: 'create',
    defaultVisible: true,
    resource: 'companies',
    redirect: false,
    mutationMode: 'pessimistic',
    onMutationSuccess: goToCompaniesListPage,
    meta: {
      gqlMutation: CREATE_COMPANY_MUTATION,
    },
  });
  // Add type of UseSelectReturnType<User, BaseOption>
  const { selectProps, queryResult } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: 'users',
    optionLabel: 'name',
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });
  return (
    <CompanyList>
      <Modal
        {...modalProps}
        mask={true}
        onCancel={goToCompaniesListPage}
        title="Create company"
        width={512}
      >
        <Form {...formProps} layout="vertical">
          <Form.Item
            label="Company name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please type company name" />
          </Form.Item>
          <Form.Item
            label="Sales owner"
            name="salesOwnerId"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Please select a Sales owner name"
              {...selectProps}
              options={
                queryResult.data?.data.map((user) => {
                  return {
                    value: user.id,
                    label: (
                      <SelectOptionWithAvatar
                        name={user.name}
                        avatarUrl={user.avatarUrl || undefined}
                      />
                    ),
                  };
                }) ?? []
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </CompanyList>
  );
};

export default Create;
