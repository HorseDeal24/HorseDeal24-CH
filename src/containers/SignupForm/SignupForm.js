import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import { Button, TextInputField } from '../../components';
import * as validators from '../../util/validators';

import css from './SignupForm.css';

const SignupFormComponent = props => {
  const { rootClassName, className, form, handleSubmit, submitting, inProgress, intl } = props;

  // email
  const emailLabel = intl.formatMessage({
    id: 'SignupForm.emailLabel',
  });
  const emailPlaceholder = intl.formatMessage({
    id: 'SignupForm.emailPlaceholder',
  });
  const emailRequiredMessage = intl.formatMessage({
    id: 'SignupForm.emailRequired',
  });
  const emailRequired = validators.required(emailRequiredMessage);

  // password
  const passwordLabel = intl.formatMessage({
    id: 'SignupForm.passwordLabel',
  });
  const passwordPlaceholder = intl.formatMessage({
    id: 'SignupForm.passwordPlaceholder',
  });
  const passwordRequiredMessage = intl.formatMessage({
    id: 'SignupForm.passwordRequired',
  });
  const passwordRequired = validators.required(passwordRequiredMessage);

  // firstName
  const firstNameLabel = intl.formatMessage({
    id: 'SignupForm.firstNameLabel',
  });
  const firstNamePlaceholder = intl.formatMessage({
    id: 'SignupForm.firstNamePlaceholder',
  });
  const firstNameRequiredMessage = intl.formatMessage({
    id: 'SignupForm.firstNameRequired',
  });
  const firstNameRequired = validators.required(firstNameRequiredMessage);

  // lastName
  const lastNameLabel = intl.formatMessage({
    id: 'SignupForm.lastNameLabel',
  });
  const lastNamePlaceholder = intl.formatMessage({
    id: 'SignupForm.lastNamePlaceholder',
  });
  const lastNameRequiredMessage = intl.formatMessage({
    id: 'SignupForm.lastNameRequired',
  });
  const lastNameRequired = validators.required(lastNameRequiredMessage);

  const classes = classNames(rootClassName || css.root, className);
  const submitDisabled = submitting || inProgress;

  return (
    <form className={classes} onSubmit={handleSubmit}>
      <div>
        <TextInputField
          type="email"
          name="email"
          id={`${form}.email`}
          label={emailLabel}
          placeholder={emailPlaceholder}
          validate={emailRequired}
        />
        <div className={css.name}>
          <TextInputField
            className={css.firstNameRoot}
            type="text"
            name="firstName"
            id={`${form}.firstName`}
            label={firstNameLabel}
            placeholder={firstNamePlaceholder}
            validate={firstNameRequired}
          />
          <TextInputField
            className={css.lastNameRoot}
            type="text"
            name="lastName"
            id={`${form}.lastName`}
            label={lastNameLabel}
            placeholder={lastNamePlaceholder}
            validate={lastNameRequired}
          />
        </div>
        <TextInputField
          className={css.password}
          type="password"
          name="password"
          id={`${form}.password`}
          label={passwordLabel}
          placeholder={passwordPlaceholder}
          validate={passwordRequired}
        />
      </div>
      <Button className={css.button} type="submit" disabled={submitDisabled}>
        <FormattedMessage id="SignupForm.signUp" />
      </Button>
    </form>
  );
};

SignupFormComponent.defaultProps = { inProgress: false };

const { bool } = PropTypes;

SignupFormComponent.propTypes = {
  ...formPropTypes,
  inProgress: bool,
  intl: intlShape.isRequired,
};

const defaultFormName = 'SignupForm';

const SignupForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(SignupFormComponent);

export default SignupForm;