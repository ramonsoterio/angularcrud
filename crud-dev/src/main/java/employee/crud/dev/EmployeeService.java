package employee.crud.dev;

import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.DELETE;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Stateless
@Path("employee")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class EmployeeService {
    
    public static Integer idCounter = 0;
        
    @PersistenceContext(unitName = "EmployeePU")
    private EntityManager entityManager;
    
    @GET
    public List<Employee> getEmployees() {
        Query query;
        try {
            query = entityManager.createQuery("SELECT e FROM Employee e");
            return query.getResultList();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        
        return null;
    }
    
    @POST
    public Employee add(Employee e) {
        try {
            entityManager.persist(e);
            System.out.println("Row added.");
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return e;
    }
    
    @PUT
    @Path("{id}")
    public Employee update(@PathParam("id") Integer id, Employee employee) {
        try {
            Employee e = this.getEmployee(id);
            e.setName(employee.getName());
            e.setPosition(employee.getPosition());
            e.setSalary(employee.getSalary());
            entityManager.merge(e);
            return employee;
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return null;
    }
    
    @DELETE
    @Path("{id}")
    public Employee delete(@PathParam("id") Integer id, Employee employee) {
        try {
            Employee em = this.getEmployee(id);
            entityManager.remove(em);
            System.out.println("Row removed.");
            return em;
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return null;            
    }
    
    @GET
    @Path("{id}")
    public Employee getEmployee(@PathParam("id") Integer id) {
        try {
            return entityManager.find(Employee.class, id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return null;            
    } 
}