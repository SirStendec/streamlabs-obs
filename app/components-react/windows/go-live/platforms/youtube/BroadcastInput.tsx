import React from 'react';
import { $t } from '../../../../../services/i18n';
import * as moment from 'moment';
import css from './BroadcastInput.m.less';
import cx from 'classnames';
import { IYoutubeLiveBroadcast } from '../../../../../services/platforms/youtube';
import { ListInput, IInputCustomProps } from '../../../../shared/inputs';
import { FormItemProps } from 'antd/lib/form';
import { SelectProps } from 'antd/lib/select';

/**
 * Broadcast-selector for Youtube
 */
export default function BroadcastInput(
  p: { broadcasts: IYoutubeLiveBroadcast[] } & Omit<SelectProps<string>, 'options'> &
    IInputCustomProps<string> &
    FormItemProps,
) {
  /**
   * format the isoDate to the locale-dependent format
   */
  function formatDate(isoDate: string): string {
    return moment(new Date(isoDate)).format(moment.localeData().longDateFormat('ll'));
  }

  const firstOption = {
    title: $t('Create New Event'),
    className: cx(css.newBroadcast, css.broadcast),
    value: '',
    el: () => (
      <>
        <div className={css.colImage}>
          <div>
            <i className="fa fa-plus" />
          </div>
        </div>
        <div className={css.colDescription}>
          <div>{$t('Create New Event')}</div>
        </div>
      </>
    ),
  };

  const restOptions = p.broadcasts.map(broadcast => ({
    title: '',
    className: '',
  }));

  return <ListInput {...p} onInput={p.onInput} options={[firstOption]} />;
  //
  // return (
  //   <ListInput value={p.value} onInput={p.onInput} {...p}>
  //     {/* "Create New" option*/}
  //     <ListOption className={cx(css.newBroadcast, css.broadcast)} value={''}>
  //       <div className={css.colImage}>
  //         <div>
  //           <i className="fa fa-plus" />
  //         </div>
  //       </div>
  //       <div className={css.colDescription}>
  //         <div>{$t('Create New Event')}</div>
  //       </div>
  //     </ListOption>
  //
  //     {/* Other options*/}
  //     {p.broadcasts.map(broadcast => (
  //       <ListOption value={broadcast.id} label={broadcast.snippet.title}>
  //         <div className={css.colImage}>
  //           <img src={broadcast.snippet.thumbnails.default.url} />
  //         </div>
  //         <div className={css.colDescription}>
  //           <div>{broadcast.snippet.title}</div>
  //           <div>{broadcast.snippet.description}</div>
  //         </div>
  //         <div className={css.colDate}>
  //           <div>{formatDate(broadcast.snippet.scheduledStartTime)}</div>
  //         </div>
  //       </ListOption>
  //     ))}
  //   </ListInput>
  // );
}
