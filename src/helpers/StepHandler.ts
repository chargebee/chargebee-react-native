type StepName = {
  pattern: string;
  stepName: (stepId?: string) => string;
};

export class StepHandler {
  static baseSteps: StepName[] = [
    {
      pattern: 'cart',
      stepName: () => 'cart_screen',
    },
    {
      pattern: 'account',
      stepName: () => 'add_account_info',
    },
    {
      pattern: 'billing_address',
      stepName: () => 'add_billing_address',
    },
    {
      pattern: 'payment_method',
      stepName: () => 'add_payment_method',
    },
    {
      pattern: 'subscription_',
      stepName: (stepId?: string) => `add_${stepId}_info`,
    },
    {
      pattern: 'review',
      stepName: () => 'review_screen',
    },
  ];

  static getStepName(url: string) {
    if (!url) {
      return;
    }
    const stepId: string = url.split('/').pop()!!;
    const step = this.baseSteps.find((s) => stepId.includes(s.pattern));
    if (!step) {
      return;
    }
    return step.stepName(stepId);
  }
}
