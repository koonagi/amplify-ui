import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { StepperField } from '../StepperField';
import {
  testFlexProps,
  expectFlexContainerStyleProps,
} from '../../Flex/__tests__/Flex.test';
import { ComponentClassNames, ComponentText } from '../../shared/constants';
import { AUTO_GENERATED_ID_PREFIX } from '../../utils/useStableId';

const LABEL = 'stepper';

describe('StepperField:', () => {
  describe('Flex wrapper', () => {
    it('should render default and custom classname', async () => {
      const classname = 'test-class';
      render(
        <StepperField
          label="stepper"
          testId="stepper-field"
          className={classname}
        />
      );

      const stepperField = await screen.findByTestId('stepper-field');
      expect(stepperField).toHaveClass(
        ComponentClassNames.Field,
        ComponentClassNames.StepperField,
        classname
      );
    });

    it('should set size attribute', async () => {
      render(
        <StepperField label="stepper" testId="stepper-field" size="small" />
      );
      const stepperField = await screen.findByTestId('stepper-field');
      expect(stepperField).toHaveAttribute('data-size', 'small');
    });

    it('should render all flex style props', async () => {
      render(
        <StepperField
          testId="stepper-field"
          label="stepper"
          {...testFlexProps}
        />
      );
      const stepperField = await screen.findByTestId('stepper-field');
      expectFlexContainerStyleProps(stepperField);
    });
  });

  describe('Label', () => {
    it('should render expected field classname', async () => {
      render(<StepperField label="stepper" />);

      const stepperLabel = await screen.findByText('stepper');
      expect(stepperLabel).toHaveClass(ComponentClassNames.Label);
    });

    it('should have `amplify-visually-hidden` class when labelHidden is true', async () => {
      render(<StepperField label="stepper" labelHidden />);

      const stepperLabel = await screen.findByText('stepper');
      expect(stepperLabel).toHaveClass('amplify-visually-hidden');
    });
  });

  describe('Input field', () => {
    it('should render classname', async () => {
      render(<StepperField label={LABEL} />);
      const stepperInput = await screen.findByLabelText(LABEL);
      expect(stepperInput).toHaveClass(ComponentClassNames.StepperFieldInput);
    });

    it('should forward ref to DOM element', async () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<StepperField label={LABEL} ref={ref} />);

      await screen.findByLabelText(LABEL);
      expect(ref.current?.nodeName).toBe('INPUT');
    });

    it('should render labeled input when id is provided', async () => {
      render(<StepperField label={LABEL} id="stepper-field" />);
      const stepperInput = await screen.findByLabelText(LABEL);
      expect(stepperInput.id).toBe('stepper-field');
    });

    it('should render labeled input when id is not provided, and is autogenerated', async () => {
      render(<StepperField label={LABEL} />);
      const stepperInput = await screen.findByLabelText(LABEL);
      expect(stepperInput.id.startsWith(AUTO_GENERATED_ID_PREFIX)).toBeTruthy();
    });

    it('should set value correctly (controlled)', async () => {
      const { rerender } = render(
        <StepperField label={LABEL} min={-10} max={10} step={2} value={0} />
      );

      const stepperInput = await screen.findByLabelText(LABEL);
      expect(stepperInput).toHaveValue(0);

      rerender(
        <StepperField label={LABEL} min={-10} max={10} step={2} value={-2} />
      );

      expect(stepperInput).toHaveValue(-2);

      rerender(
        <StepperField label={LABEL} min={-10} max={10} step={2} value={0} />
      );

      expect(stepperInput).toHaveValue(0);

      userEvent.type(stepperInput, '9');
      fireEvent.blur(stepperInput);
      // will be rounded up to 10 when losing focus since the step is 2
      expect(stepperInput).toHaveValue(10);
    });

    it('should set value correctly (uncontrolled)', async () => {
      render(
        <StepperField
          label={LABEL}
          defaultValue={0}
          min={-10}
          max={10}
          step={2}
        />
      );
      const stepperInput = await screen.findByLabelText(LABEL);
      expect(stepperInput).toHaveValue(0);
      const buttons = await screen.findAllByRole('button');
      userEvent.click(buttons[0]);
      expect(stepperInput).toHaveValue(-2);
      userEvent.click(buttons[1]);
      expect(stepperInput).toHaveValue(0);
      userEvent.type(stepperInput, '9');
      fireEvent.blur(stepperInput);
      // will be rounded up to 10 when losing focus since the step is 2
      expect(stepperInput).toHaveValue(10);
    });

    it('should render min, max, step attributes', async () => {
      render(<StepperField label={LABEL} min={0} max={10} step={2} />);

      const stepperInput = await screen.findByLabelText(LABEL);
      expect(stepperInput).toHaveAttribute('min', '0');
      expect(stepperInput).toHaveAttribute('max', '10');
      expect(stepperInput).toHaveAttribute('step', '2');
    });

    it('should render the state attributes', async () => {
      render(<StepperField label={LABEL} isDisabled isReadOnly isRequired />);

      const stepperInput = await screen.findByLabelText(LABEL);
      expect(stepperInput).toHaveAttribute('disabled');
      expect(stepperInput).toHaveAttribute('readonly');
      expect(stepperInput).toHaveAttribute('required');
    });

    it('should set size attribute', async () => {
      render(<StepperField label={LABEL} size="small" />);

      const stepperInput = await screen.findByLabelText(LABEL);
      expect(stepperInput).toHaveAttribute('data-size', 'small');
    });

    it('show render aria-invalid attribute to input when hasError', async () => {
      render(
        <StepperField label={LABEL} errorMessage="Error message" hasError />
      );
      const stepperInput = await screen.findByLabelText(LABEL);
      expect(stepperInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('should fire event handlers', async () => {
      const onBlur = jest.fn();
      const onChange = jest.fn();
      const onWheel = jest.fn();
      render(
        <StepperField
          label={LABEL}
          onBlur={onBlur}
          onChange={onChange}
          onWheel={onWheel}
        />
      );
      const stepperInput = await screen.findByLabelText(LABEL);
      userEvent.type(stepperInput, '100');
      fireEvent.blur(stepperInput);
      fireEvent.wheel(stepperInput);
      expect(onChange).toHaveBeenCalled();
      expect(onBlur).toHaveBeenCalled();
      expect(onWheel).toHaveBeenCalled();
    });
  });

  describe('Increase/Decrease button', () => {
    it('should pass through size attribute', async () => {
      render(<StepperField label="stepper" size="small" />);
      const buttons = await screen.findAllByRole('button');
      expect(buttons[0]).toHaveAttribute('data-size', 'small');
      expect(buttons[1]).toHaveAttribute('data-size', 'small');
    });

    it('should render the size classes for StepperField', async () => {
      render(
        <div>
          <StepperField label="stepper" size="small" />
          <StepperField label="stepper" size="large" />
        </div>
      );
      const buttons = await screen.findAllByRole('button');
      expect(buttons[0]).toHaveClass(`${ComponentClassNames.Button}--small`);
      expect(buttons[1]).toHaveClass(`${ComponentClassNames.Button}--small`);
      expect(buttons[2]).toHaveClass(`${ComponentClassNames.Button}--large`);
      expect(buttons[3]).toHaveClass(`${ComponentClassNames.Button}--large`);
    });

    it('should render the variation classes for StepperField', async () => {
      render(
        <div>
          <StepperField label="stepper" variation="quiet" />
        </div>
      );
      const buttons = await screen.findAllByRole('button');
      expect(buttons[0]).toHaveClass(
        `${ComponentClassNames.StepperFieldButtonDecrease}--quiet`
      );
      expect(buttons[1]).toHaveClass(
        `${ComponentClassNames.StepperFieldButtonIncrease}--quiet`
      );
    });

    it('should render aria attributes', async () => {
      const id = 'stepper-field';
      render(
        <StepperField
          label="stepper"
          id={id}
          defaultValue={0}
          min={0}
          max={10}
          step={2}
        />
      );
      const buttons = await screen.findAllByRole('button');
      expect(buttons[0]).toHaveAttribute(
        'aria-label',
        `${ComponentText.StepperField.decreaseButtonLabel} -2`
      );
      expect(buttons[1]).toHaveAttribute(
        'aria-label',
        `${ComponentText.StepperField.increaseButtonLabel} 2`
      );
      expect(buttons[0]).toHaveAttribute('aria-controls', id);
      expect(buttons[1]).toHaveAttribute('aria-controls', id);
    });

    it('should be able to customize aria label', async () => {
      const id = 'stepper-field';
      const increaseButtonLabel = 'Custom increase to';
      const decreaseButtonLabel = 'Custom decrease to';
      render(
        <StepperField
          label="stepper"
          increaseButtonLabel={increaseButtonLabel}
          decreaseButtonLabel={decreaseButtonLabel}
          id={id}
          defaultValue={0}
          min={0}
          max={10}
          step={2}
        />
      );

      const buttons = await screen.findAllByRole('button');
      expect(buttons[0]).toHaveAttribute(
        'aria-label',
        `${decreaseButtonLabel} -2`
      );
      expect(buttons[1]).toHaveAttribute(
        'aria-label',
        `${increaseButtonLabel} 2`
      );
    });
  });

  describe('Error messages', () => {
    const errorMessage = 'This is an error message';
    it('should not show when hasError is false', () => {
      render(<StepperField label="stepper" errorMessage={errorMessage} />);

      const errorText = screen.queryByText(errorMessage);
      expect(errorText).not.toBeInTheDocument();
    });

    it('show when hasError and errorMessage', () => {
      render(
        <StepperField label="stepper" errorMessage={errorMessage} hasError />
      );
      const errorText = screen.queryByText(errorMessage);
      expect(errorText?.innerHTML).toContain(errorMessage);
    });
  });

  describe('descriptive message', () => {
    it('should render descriptiveText if it is provided', () => {
      render(<StepperField label="stepper" descriptiveText="Description" />);

      const descriptiveText = screen.queryByText('Description');
      expect(descriptiveText?.innerHTML).toContain('Description');
    });

    it('should map to descriptive text correctly', async () => {
      render(<StepperField label="stepper" descriptiveText="Description" />);

      const stepperInput = await screen.findByLabelText('stepper');
      expect(stepperInput).toHaveAccessibleDescription('Description');
    });
  });
});
