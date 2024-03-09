// Author: Tiago Barracha
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Repositories.Users;

import org.springframework.data.repository.NoRepositoryBean;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.MonetaryUser;

import java.util.Optional;

@NoRepositoryBean
public interface MonetaryUserRepository<T extends MonetaryUser> extends AppUserRepository<T> {
    Optional<T> findByNif(String nif);

    Optional<T> findByPaymentInfoId(String paymentInfoId);

    Optional<T> findByInvoiceInfoId(String invoiceInfoId);
}
