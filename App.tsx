import React, {useCallback} from 'react';
import {StyleSheet, ScrollView, View, SafeAreaView} from 'react-native';
import {
  Provider as PaperProvider,
  Text,
  TextInput,
  Switch,
  Button,
} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {useForm, Controller} from 'react-hook-form';

interface FormDefinition {
  readonly text: string;
  readonly switchValue: boolean;
  readonly pickerValue: 'js' | 'java' | undefined;
}

const REQUIRED_VALIDATION_RULES = {required: true};
const TEXT_FIELD_VALIDATION_RULES = {
  ...REQUIRED_VALIDATION_RULES,
  minLength: 5,
};

const App = () => {
  const {control, handleSubmit, formState} = useForm<FormDefinition>({
    defaultValues: {
      text: '',
      switchValue: true,
      pickerValue: undefined,
    },
    mode: 'all',
  });

  const onSubmit = useCallback((submitData: FormDefinition) => {
    console.info('submit data', submitData);
  }, []);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <Controller
            rules={TEXT_FIELD_VALIDATION_RULES}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="First text"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
            control={control}
            name={'text'}
          />
          {formState.errors.text?.type === 'required' && <Text>REQUIRED</Text>}
          {formState.errors.text?.type === 'minLength' && (
            <Text>TOO SHORT</Text>
          )}

          <View>
            <Text>Switch:</Text>
            <Controller
              render={({field: {onChange, onBlur, value}}) => (
                <Switch
                  value={value}
                  onValueChange={value => {
                    console.log(value);
                    onChange(value);
                    onBlur();
                  }}
                />
              )}
              name={'switchValue'}
              control={control}
            />
          </View>
          <Controller
            rules={REQUIRED_VALIDATION_RULES}
            render={({field: {onChange, onBlur, value}}) => (
              <Picker
                style={{backgroundColorŚŚ: 'white'}}
                selectedValue={value}
                onValueChange={value => {
                  onChange(value);
                  onBlur();
                }}>
                <Picker.Item
                  label="Java"
                  value="java"
                  style={styles.text}
                />
                <Picker.Item
                  label="JavaScript"
                  value="js"
                  style={styles.text}
                />
              </Picker>
            )}
            name={'pickerValue'}
            control={control}
          />
          <Text>{JSON.stringify(formState)}</Text>
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {color: 'white'},
});

export default App;
