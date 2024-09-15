import { Form, Input, Modal, Select } from 'antd'
import { CompanyList } from './List'
import { useModalForm, useSelect } from '@refinedev/antd'
import { useGo } from '@refinedev/core'
import { CREATE_COMPANY_MUTATION } from '@/graphql/mutations';
import { USERS_SELECT_QUERY } from '@/graphql/queries';
import SelectOptionWithAvatar from '@/components/select-option-with-avatar';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { UsersSelectQuery } from '@/graphql/types';

const Create = () => { 
  const go = useGo();
 const goToListPage = () => { 
   go({
    to: { resource:'companies', action: 'list' }, 
    options: { keepQuery: true }, 
    type: 'replace'
   })
 }
 
  const { formProps, modalProps } = useModalForm({
   
    action: 'create', 
    defaultVisible: true, // show the modal by default  
    resource: 'companies',    
    redirect: false, 
    mutationMode: 'pessimistic', // show the loading state while the mutation is in progress
                                 // and disable the submit button 
                                 // (optimistic mode is the default)  
                                 // means that the mutation is executed immediately 
                                 // and the loading state is not shown
    onMutationSuccess: goToListPage,
    meta: { 
      gqlQuery: CREATE_COMPANY_MUTATION
    }
  })

  const { selectProps, queryResult } = 
  useSelect<GetFieldsFromList<UsersSelectQuery>>({
    resource: 'users', 
    optionLabel: 'name', 
    meta: { 
      gqlQuery: USERS_SELECT_QUERY,
    }
  })


  return (
    <CompanyList>
      <Modal 
      {...modalProps} 
      mask= {true}
      onCancel= {goToListPage}
      title= "Create Company" 
      width={512}
      >  
      <Form {...formProps} layout= "vertical">
        <Form.Item 
        label= "Company name" 
        name= "name" 
        rules= {[{required: true}]}
        > 
        <Input placeholder="Please enter a company name" />

        </Form.Item>   
 
        <Form.Item  
        label= "Sales owner" 
        name= "salesOwnerId"
        rules= {[{required: true}]}
        >
        <Select
        placeholder= "please select a sales owner"   
        {...selectProps}
        options= {
          queryResult.data?.data.map((user) => ({
            value: user.id,
            label: (
              <SelectOptionWithAvatar  
              name={user.name} 
              avatarUrl={user.avatarUrl ?? undefined}

              />
            )
          })) ?? []
        }
        />
        </Form.Item>
        


      </Form>

      </Modal>
    </CompanyList>
  );
};

export default Create