import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenseAction } from '../redux/actions/index';

class Table extends Component {
  handleDelete = (id) => {
    const { dispatchId } = this.props;
    console.log('clicou');
    dispatchId(id);
    // const { dispatch } = this.props;
    // dispatch(deleteExpenseAction(id));
  }

  render() {
    const { getFormState } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        { getFormState.map((expense, index) => (
          <tbody key={ index }>
            <tr>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ Number(expense.value).toFixed(2) }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
              <td>
                { (Number(expense.value) * (expense
                  .exchangeRates[expense.currency].ask)).toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button
                  key={ expense.id }
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.handleDelete(expense.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        )) }

      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  getFormState: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchId: (id) => dispatch(deleteExpenseAction(id)),
});

Table.propTypes = {
  getFormState: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
