import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import test from 'tape';
import PropTypes from 'prop-types';

import PageVisibility from '../src/index';

const noop = function () {};

const Child = (props) => {
    const { documentHidden, visibilityState } = props;
    return (
        <div>
            <p>{documentHidden ? 'hidden' : 'shown'}</p>
            <p>{visibilityState}</p>
        </div>
    );
};

Child.propTypes = {
    documentHidden: PropTypes.bool,
    visibilityState: PropTypes.string,
};

test('render the component', (t) => {
    const result = shallow(<PageVisibility onChange={noop} />);
    t.equal(result.length, 1);
    t.end();
});

test('throw if trying to render multiple direct children', (t) => {
    t.throws(
        () =>
            shallow(
                <PageVisibility onChange={noop}>
                    <div />
                    <div />
                </PageVisibility>
            ),
        /React.Children.only expected to receive a single React element child/
    );
    t.end();
});

test('throw if trying to render multiple custom direct children', (t) => {
    t.throws(
        () =>
            shallow(
                <PageVisibility onChange={noop}>
                    <Child />
                    <Child />
                </PageVisibility>
            ),
        /React.Children.only expected to receive a single React element child/
    );
    t.end();
});

test('allow children as function', (t) => {
    const stub = sinon.stub();
    const wrapper = shallow(<PageVisibility>{stub}</PageVisibility>);

    t.equal(wrapper.length, 1);
    t.equal(stub.callCount, 1);
    t.equal(stub.firstCall.args.length, 2);
    t.equal(stub.firstCall.args[0], false);
    t.equal(stub.firstCall.args[1], 'prerender');

    t.end();
});
