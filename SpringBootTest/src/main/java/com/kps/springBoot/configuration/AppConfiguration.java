package com.kps.springBoot.configuration;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.mybatis.spring.transaction.SpringManagedTransactionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;

import com.kps.springBoot.configuration.properties.DatabaseProperties;

@Configuration
@EnableConfigurationProperties
@EnableTransactionManagement(proxyTargetClass = true)
@MapperScan("com.kps.springBoot.dao")
@ComponentScan(basePackages = { "com.kps.springBoot" })
public class AppConfiguration implements TransactionManagementConfigurer {
	
	@Autowired
	private DatabaseProperties databaseProperties;
	
    @Bean
    @ConditionalOnBean(DatabaseProperties.class)
    public DriverManagerDataSource dataSource() throws IOException {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        Properties properties = new Properties();
        InputStream user_props = this.getClass()
                					.getResourceAsStream("/mybatis/database.properties");
        properties.load(user_props);
        dataSource.setDriverClassName(properties.getProperty("db.driverClass"));
        dataSource.setUrl(properties.getProperty("db.url"));
        dataSource.setUsername(properties.getProperty("db.username"));
        dataSource.setPassword(properties.getProperty("db.password"));
        
//        dataSource.setUrl(databaseProperties.getUrl());
//        dataSource.setUsername(databaseProperties.getUsername());
//        dataSource.setPassword(databaseProperties.getPassword());
        return dataSource;
    }
    
    @Bean
    public SqlSessionFactory getSessionFactory() throws Exception {
        SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
        sessionFactoryBean.setDataSource(dataSource());
        sessionFactoryBean.setConfigLocation(new ClassPathResource("mybatis/MybatisConfig.xml"));
        
        SpringManagedTransactionFactory springManagedTransactionFactory = new SpringManagedTransactionFactory();
        springManagedTransactionFactory.newTransaction(dataSource(), null, false);
        sessionFactoryBean.setTransactionFactory(springManagedTransactionFactory);
        return sessionFactoryBean.getObject();
    }
    
    @Bean
    public PlatformTransactionManager txManager() throws IOException {
    	return new DataSourceTransactionManager(dataSource());
    }
    
    @Override
    public PlatformTransactionManager annotationDrivenTransactionManager() {
        try {
        	return txManager();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
    }
    
}
