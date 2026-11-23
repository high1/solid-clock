import type { Rule } from 'eslint';

type Body = Parameters<Rule.RuleContext['sourceCode']['isSpaceBetween']>[1];
type VisitNode = Parameters<
  NonNullable<Rule.NodeListener['ForInStatement' | 'ForOfStatement' | 'ForStatement' | 'IfStatement' | 'WhileStatement']>
>[0];

export default {
  create(context) {
    function check(body: Body) {
      if (body.type === 'BlockStatement') return;
      const before = context.sourceCode.getTokenBefore(body);
      if (before?.value !== ')' || context.sourceCode.isSpaceBetween(before, body) || !body.loc) return;
      context.report({
        fix: fixer => fixer.insertTextAfter(before, ' '),
        loc: body.loc,
        messageId: 'missing',
      });
    }

    function visit(node: VisitNode) {
      check(node.type === 'IfStatement' ? node.consequent : node.body);
    }

    return {
      ForInStatement: visit,
      ForOfStatement: visit,
      ForStatement: visit,
      IfStatement: visit,
      WhileStatement: visit,
    };
  },
  meta: {
    fixable: 'whitespace',
    messages: { missing: 'Expected a space after ")".' },
  },
} satisfies Rule.RuleModule;
